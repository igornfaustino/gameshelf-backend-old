import { gamesAxiosResponse, Count } from '../types/api';
import { SearchArgs } from '../types/graphQL';
import {
	searchGameByName,
	getCovers,
	countSearchGameByName,
} from '../helpers/api';
import { saveGenresToDatabase, savePlatformsToDatabase } from '../helpers/db';
import { joinGamesAndCovers, apiGameToGraphQLFormat } from '../helpers/commons';

export const searchGames = async (_parents: any, args: SearchArgs) => {
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

		const covers = await getCovers(coversId);
		const gamesWithCover = joinGamesAndCovers(games, covers);
		return {
			games: apiGameToGraphQLFormat(gamesWithCover),
			count,
		};
	} catch (error) {
		throw error;
	}
};
