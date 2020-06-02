import {
	getUniquePlatformsId,
	getUniqueGenresId,
	joinGamesAndCovers,
} from './commons';
import { Model } from 'sequelize-typescript';
import { APIGameData, gamesAxiosResponse } from '../types/api';
import { GameIdAndList, List as ListType } from '../types/graphQL';
import { Platform } from '../database/models/platform';
import { getPlatforms, getGenres, getGamesById, getCovers } from './api';
import { Genre } from '../database/models/genre';
import { List } from '../database/models/list';
import { Game } from '../database/models/game';
import { UserGameList } from '../database/models/usergamelist';

const getPlatformIdsFromDatabase = async () =>
	(await Platform.findAll()).map((platform) => platform.id);

const getGenresIdsFromDatabase = async () =>
	(await Genre.findAll()).map((genre) => genre.id);

export const savePlatformsToDatabase = async (games: APIGameData[]) => {
	const requestPlatformSet = Array.from(getUniquePlatformsId(games));
	const databasePlatform = await getPlatformIdsFromDatabase();
	const idMissingInDatabase = requestPlatformSet.filter(
		(id) => databasePlatform.indexOf(id) == -1,
	);
	if (idMissingInDatabase.length == 0) return;
	const platforms = await getPlatforms(
		idMissingInDatabase,
		idMissingInDatabase.length,
	);
	await Platform.bulkCreate(platforms);
};

export const saveGenresToDatabase = async (games: APIGameData[]) => {
	const requestGenresSet = Array.from(getUniqueGenresId(games));
	const databaseGenres = await getGenresIdsFromDatabase();
	const idMissingInDatabase = requestGenresSet.filter(
		(id) => databaseGenres.indexOf(id) == -1,
	);
	if (idMissingInDatabase.length == 0) return;
	const genres = await getGenres(
		idMissingInDatabase,
		idMissingInDatabase.length,
	);
	await Genre.bulkCreate(genres);
};

export const getPlatformsFromIds = (ids: number[]) =>
	Platform.findAll({ where: { id: ids } });

export const getGenresFromIds = (ids: number[]) =>
	Genre.findAll({ where: { id: ids } });

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

export const addMissingRelatedGames = async (similarGames: number[]) => {
	const missingSimilarGames = await similarGames.reduce<Promise<number[]>>(
		async (missingIds, gameId) => {
			const game = await Game.findByPk(gameId);
			if (game) return [...(await missingIds)];
			return [...(await missingIds), gameId];
		},
		Promise.resolve([]),
	);

	if (!missingSimilarGames.length) return;

	const res: gamesAxiosResponse = await getGamesById(missingSimilarGames);
	const relatedGames = res.data;
	const coversId = <number[]>(
		relatedGames.map(({ cover }) => cover).filter(Boolean)
	);
	await saveGenresToDatabase(relatedGames);
	await savePlatformsToDatabase(relatedGames);

	const covers = await getCovers(coversId);
	const gamesWithCover = joinGamesAndCovers(relatedGames, covers);
	gamesWithCover.map(
		async (game) =>
			await createOrUpdateGame(
				parseInt(game.id),
				game.name,
				game.cover || '',
				game.genres || [],
				game.platforms || [],
			),
	);
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

export const getAllListEntriesMatchedWithGames = async (
	gamesId: number[],
	userId: number,
): Promise<GameIdAndList[]> => {
	const listItems = await UserGameList.findAll({
		where: { userId, gameId: gamesId },
	});
	const gameAndListPromises = listItems.map(
		async (list): Promise<GameIdAndList | undefined> => {
			const userList = await list.$get('list');
			if (!userList) return;
			return {
				gameId: list.gameId,
				userList: userList.name,
			};
		},
	);
	const gameAndList = await Promise.all(gameAndListPromises);
	return <GameIdAndList[]>(
		gameAndList.filter(Boolean).sort((a, b) => a!.gameId - b!.gameId)
	);
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
