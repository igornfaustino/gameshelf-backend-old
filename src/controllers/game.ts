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
} from '../helpers/db';
import { Game as GameType } from '../types/graphQL';

export const getGamesFromList = async (
	_parents: undefined,
	{ listId }: { listId: number },
	context: Context,
) => {
	const userId = await getUserId(context);
	return UserGameList.findAll({
		where: {
			userId,
			listId,
		},
		include: [Game],
	}).then((value) => value.map((userGame) => userGame.game));
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

	return true;
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
