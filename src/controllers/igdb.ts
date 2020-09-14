import { gamesAxiosResponse, Count, APISimpleGameData } from '../types/api';
import { SearchArgs, Context } from '../types/graphQL';
import { searchGameByName, countSearchGameByName } from '../helpers/api';
import { saveGenresToDatabase, savePlatformsToDatabase } from '../helpers/db';
import { apiGameToGraphQLFormat } from '../helpers/commons';

const getGamesFromAPI = async (args: SearchArgs) => {
	const res: gamesAxiosResponse = await searchGameByName(
		args.search,
		args.genres,
		args.platforms,
		args.limit,
		args.offset,
	);
	return res.data;
};

const getTotalOfGamesFromAPI = async (args: SearchArgs) => {
	const res: Count = await countSearchGameByName(
		args.search,
		args.genres,
		args.platforms,
		args.limit,
		args.offset,
	);
	return res.data.count;
};

export const searchGames = async (
	_parents: any,
	args: SearchArgs,
	context: Context,
) => {
	try {
		const games = await getGamesFromAPI(args);
		const totalOfGames = await getTotalOfGamesFromAPI(args);

		await saveNewGenresAndPlatformsToDatabase(games);
		const gamesOnGraphQlFormat = apiGameToGraphQLFormat(games);
		return {
			gamesAndList: gamesOnGraphQlFormat,
			count: totalOfGames,
		};
	} catch (error) {
		throw error;
	}
};

async function saveNewGenresAndPlatformsToDatabase(games: APISimpleGameData[]) {
	await saveGenresToDatabase(games);
	await savePlatformsToDatabase(games);
}
