import { UserGameList } from '../database/models/usergamelist';
import { Context } from '../types/graphQL';
import { getUserId } from '../helpers/auth';
import { Game } from '../database/models/game';

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
