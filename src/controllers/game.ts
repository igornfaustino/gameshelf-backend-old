import { UserGameList } from '../database/models/usergamelist';
import { Context, addOrMoveGameArgs } from '../types/graphQL';
import { getUserId } from '../helpers/auth';
import { Game } from '../database/models/game';
import {
	createOrUpdateGame,
	addMissingRelatedGames,
	addOrUpdateUserGameList,
	removeGameFromUserListTable,
	safeSet,
	getOneListEntriesMatchedWithGames,
} from '../helpers/db';
import { Game as GameType } from '../types/graphQL';
import { Platform } from '../database/models/platform';
import { Genre } from '../database/models/genre';

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

export const getGamesFromList = async (
	_parents: undefined,
	{
		listId,
		platforms,
		genres,
		limit,
		offset,
	}: {
		listId: number;
		platforms: number[];
		genres: number[];
		limit: number;
		offset: number;
	},
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
	return UserGameList.findAll({
		...query,
		order: ['gameId'],
		limit,
		offset,
	}).then((value) => {
		return {
			games: value.map((userGame) => userGame.game),
			count,
		};
	});
};

export const addOrMoveGameToList = async (
	_parent: undefined,
	{
		gameId,
		listId,
		name,
		coverURL,
		genres,
		platforms,
		similarGames,
	}: addOrMoveGameArgs,
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
	await addMissingRelatedGames(similarGames);
	await addOrUpdateUserGameList(userId, game.id, listId);
	await safeSet(game, 'relatedGames', similarGames);

	return game;
};

export const removeGameFromList = async (
	_parent: undefined,
	{ gameId }: { gameId: number },
	context: Context,
) => {
	const userId = parseInt(await getUserId(context));
	return removeGameFromUserListTable(gameId, userId);
};

export const getSimilarGames = async (parents: Game | GameType) => {
	if (parents instanceof Game)
		return (await parents.$get('relatedGames')).map((game) => game.id);
	return parents.similarGames;
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
