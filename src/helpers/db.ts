import { getUniquePlatforms, getUniqueGenres } from './commons';
import { Model } from 'sequelize-typescript';
import { APISimpleGameData } from '../types/api';
import { GameIdAndList, List as ListType } from '../types/graphQL';
import { Platform } from '../database/models/platform';
import { Genre } from '../database/models/genre';
import { List } from '../database/models/list';
import { Game } from '../database/models/game';
import { UserGameList } from '../database/models/usergamelist';

const getPlatformIdsFromDatabase = async () =>
	(await Platform.findAll()).map((platform) => platform.id);

const getGenresIdsFromDatabase = async () =>
	(await Genre.findAll()).map((genre) => genre.id);

export const savePlatformsToDatabase = async (games: APISimpleGameData[]) => {
	const requestPlatforms = getUniquePlatforms(games);
	const databasePlatform = await getPlatformIdsFromDatabase();
	const platformsMissingInDatabase = requestPlatforms.filter(
		({ id }) => databasePlatform.indexOf(id) == -1,
	);
	if (platformsMissingInDatabase.length == 0) return;
	await Platform.bulkCreate(platformsMissingInDatabase);
};

export const saveGenresToDatabase = async (games: APISimpleGameData[]) => {
	const requestGenres = getUniqueGenres(games);
	const databaseGenres = await getGenresIdsFromDatabase();
	const genresMissingInDatabase = requestGenres.filter(
		({ id }) => databaseGenres.indexOf(id) == -1,
	);
	if (genresMissingInDatabase.length == 0) return;
	await Genre.bulkCreate(genresMissingInDatabase);
};

export const getAllPlatforms = () => Platform.findAll();

export const getAllGenres = () => Genre.findAll();

export const getAllLists = async (userId: number) => {
	const lists = await List.findAll();
	return lists.map(async (list) => {
		const count = await UserGameList.count({
			where: { userId, listId: list.id },
		});
		return {
			count,
			list,
		};
	});
};

export const createOrUpdateGame = async (
	gameId: number,
	name: string,
	coverURL: string,
	genres: number[],
	platforms: number[],
) => {
	let game = await Game.findByPk(gameId);
	if (game) {
		game = await game.update({ name, coverURL });
	} else {
		game = await Game.create({ id: gameId, name, coverURL });
	}
	await safeSet(game, 'genres', genres);
	await safeSet(game, 'platforms', platforms);

	return game;
};

export const addOrUpdateUserGameList = async (
	userId: number,
	gameId: number,
	listId: number,
) => {
	const listItem = await UserGameList.findOne({ where: { userId, gameId } });
	if (listItem) return listItem.$set('list', listId);
	return UserGameList.create({
		userId,
		gameId,
		listId,
	});
};

export const removeGameFromUserListTable = async (
	gameId: number,
	userId: number,
) => {
	const listItem = await UserGameList.findOne({ where: { userId, gameId } });
	if (listItem) await listItem.destroy();
	return Game.findOne({ where: { id: gameId } });
};

export const getOneListEntriesMatchedWithGames = async (
	gameId: number,
	userId: number,
): Promise<ListType | undefined> => {
	const listItems = await UserGameList.findOne({
		where: { userId, gameId: gameId },
	});

	const userList = await listItems?.$get('list');
	return {
		id: userList?.id,
		name: userList?.name,
	};
};

export const safeSet = async (model: Model, set: any, values: any[]) => {
	await model.$set(set, []);
	await model.$set(set, values);
};
