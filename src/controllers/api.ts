import { SearchArgs, APIGameData } from '../types/api';
import {
	searchGameByName,
	getCovers,
	joinGamesAndCovers,
	apiGameToGraphQLFormat,
} from '../helpers/api';

interface gamesAxioResponse {
	data: APIGameData[];
}

export const searchGames = async (
	_parents: any,
	args: SearchArgs,
	_context: any,
	_info: any,
) => {
	try {
		const res: gamesAxioResponse = await searchGameByName(
			args.search,
			args.limit,
			args.offset,
		);
		const games = res.data;
		const coversId = <number[]>games.map(({ cover }) => cover).filter(Boolean);
		const covers = await getCovers(coversId);
		const gamesWithCover = joinGamesAndCovers(games, covers);
		return apiGameToGraphQLFormat(gamesWithCover);
	} catch (error) {
		throw error;
	}
};
