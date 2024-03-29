import { UserGameList } from '../database/models/usergamelist';
import { Context, addOrMoveGameArgs, GameAndList } from '../types/graphQL';
import { getUserId } from '../helpers/auth';
import { Game } from '../database/models/game';
import {
	createOrUpdateGame,
	addOrUpdateUserGameList,
	removeGameFromUserListTable,
	getOneListEntriesMatchedWithGames,
} from '../helpers/db';
import { GameSimplified as GameType } from '../types/graphQL';
import { Platform } from '../database/models/platform';
import { Genre } from '../database/models/genre';
import {
	dbGameToGraphQLFormat,
	dbGameListToGraphQLFormat,
} from '../helpers/commons';
import { type } from 'os';

const EMPTY: never[] = [];

const getQueryToGetGamesList = (
	platforms: number[],
	genres: number[],
	userId: number,
	listId: number,
) => {
	const includes = [];
	if (platforms && platforms.length) {
		includes.push({
			model: Platform,
			where: {
				id: platforms,
			},
			required: true,
		});
	}
	if (genres && genres.length) {
		includes.push({
			model: Genre,
			where: {
				id: genres,
			},
			required: true,
		});
	}
	return {
		include: [
			{
				model: Game,
				include: includes,
				required: true,
			},
		],
		where: {
			userId,
			listId,
		},
	};
};

type getGameFromListProps = {
	listId: number;
	platforms: number[];
	genres: number[];
	limit: number;
	offset: number;
};
export const getGamesFromList = async (
	_parents: undefined,
	{ listId, platforms, genres, limit, offset }: getGameFromListProps,
	context: Context,
) => {
	const userId = await getUserId(context);
	const query = getQueryToGetGamesList(
		platforms,
		genres,
		Number(userId),
		listId,
	);
	const count = await UserGameList.count(query);
	const userGamesList = await UserGameList.findAll({
		...query,
		order: ['gameId'],
		limit,
		offset,
	});
	const games = userGamesList.map((userGame) => userGame.game);
	const gamesAndList = await dbGameListToGraphQLFormat(games);
	return {
		gamesAndList,
		count,
	};
};

export const addOrMoveGameToList = async (
	_parent: undefined,
	{ gameId, listId, name, coverURL, genres, platforms }: addOrMoveGameArgs,
	context: Context,
) => {
	const userId = parseInt(await getUserId(context));
	const game = await createOrUpdateGame(
		gameId,
		name,
		coverURL,
		genres,
		platforms,
	);
	await addOrUpdateUserGameList(userId, game.id, listId);

	return dbGameToGraphQLFormat(game);
};

export const removeGameFromList = async (
	_parent: undefined,
	{ gameId }: { gameId: number },
	context: Context,
) => {
	const userId = parseInt(await getUserId(context));
	const game = await removeGameFromUserListTable(gameId, userId);
	return game ? dbGameToGraphQLFormat(game) : null;
};

export const getGameList = async (
	parents: Game | GameType,
	_: any,
	context: Context,
) => {
	try {
		const userId = await getUserId(context);
		return getOneListEntriesMatchedWithGames(
			Number(parents.id),
			Number(userId),
		);
	} catch {
		return EMPTY;
	}
};
