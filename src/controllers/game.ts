import { UserGameList } from '../database/models/usergamelist';
import { Context, addOrMoveGameArgs } from '../types/graphQL';
import { getUserId } from '../helpers/auth';
import { Game } from '../database/models/game';
import {
	createOrUpdateGame,
	addMissingRelatedGames,
	addOrUpdateUserGameList,
} from '../helpers/db';

export const getGamesFromList = (
	_parents: undefined,
	{ listId }: { listId: number },
	context: Context,
) => {
	const userId = getUserId(context);
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
	const userId = parseInt(getUserId(context));
	const game = await createOrUpdateGame(
		gameId,
		name,
		coverURL,
		genres,
		platforms,
	);
	await addMissingRelatedGames(similarGames);
	await addOrUpdateUserGameList(userId, game.id, listId);
	await game.$set('relatedGames', similarGames);
	return true;
};
