import { gamesAxiosResponse, Count } from '../types/api';
import { SearchArgs, Context } from '../types/graphQL';
import {
	searchGameByName,
	getCovers,
	countSearchGameByName,
} from '../helpers/api';
import {
	saveGenresToDatabase,
	savePlatformsToDatabase,
	getAllListEntriesMatchedWithGames,
} from '../helpers/db';
import {
	joinGamesAndCovers,
	apiGameToGraphQLFormat,
	joinGamesAndUserLists,
} from '../helpers/commons';
import { getUserId } from '../helpers/auth';

export const searchGames = async (
	_parents: any,
	args: SearchArgs,
	context: Context,
) => {
	try {
		const searchRes: gamesAxiosResponse = await searchGameByName(
			args.search,
			args.genres,
			args.platforms,
			args.limit,
			args.offset,
		);
		const countRes: Count = await countSearchGameByName(
			args.search,
			args.genres,
			args.platforms,
			args.limit,
			args.offset,
		);
		const count = countRes.data.count;
		const games = searchRes.data;
		const coversId = <number[]>games.map(({ cover }) => cover).filter(Boolean);
		await saveGenresToDatabase(games);
		await savePlatformsToDatabase(games);

		const covers = coversId.length ? await getCovers(coversId) : [];
		const gamesWithCover = joinGamesAndCovers(games, covers);

		const gamesId = <number[]>(
			games.map(({ id }) => parseInt(id)).filter(Boolean)
		);

		try {
			const userId = parseInt(await getUserId(context));
			const gameIdAndList = await getAllListEntriesMatchedWithGames(
				gamesId,
				userId,
			);
			const gamesWithCoverAndList = joinGamesAndUserLists(
				gamesWithCover,
				gameIdAndList,
			);
			return {
				games: apiGameToGraphQLFormat(gamesWithCoverAndList),
				count,
			};
		} catch (ex) {
			console.log({ ex });
			return {
				games: apiGameToGraphQLFormat(gamesWithCover),
				count,
			};
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
