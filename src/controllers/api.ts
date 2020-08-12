import {
	gamesAxiosResponse,
	Count,
	APIGameDataExtraFields,
	APIGameData,
} from '../types/api';
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

const getGamesOnGraphQlFormatWihOrWithoutUserLists = async (
	context: Context,
	games: APIGameDataExtraFields[],
) => {
	try {
		const gamesId = <number[]>(
			games.map(({ id }) => parseInt(id)).filter(Boolean)
		);
		const userId = parseInt(await getUserId(context));
		const gameIdAndList = await getAllListEntriesMatchedWithGames(
			gamesId,
			userId,
		);
		const gamesWithCoverAndList = joinGamesAndUserLists(games, gameIdAndList);
		return apiGameToGraphQLFormat(gamesWithCoverAndList);
	} catch {
		return apiGameToGraphQLFormat(games);
	}
};

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

		const gamesWithCover = await searchCoversAndJoinWithGames(games);
		const gamesOnGraphQlFormat = await getGamesOnGraphQlFormatWihOrWithoutUserLists(
			context,
			gamesWithCover,
		);
		return {
			games: gamesOnGraphQlFormat,
			count: totalOfGames,
		};
	} catch (error) {
		throw error;
	}
};

async function searchCoversAndJoinWithGames(games: APIGameData[]) {
	const coversId = <number[]>games.map(({ cover }) => cover).filter(Boolean);
	const covers = coversId.length ? await getCovers(coversId) : [];
	const gamesWithCover = joinGamesAndCovers(games, covers);
	return gamesWithCover;
}

async function saveNewGenresAndPlatformsToDatabase(games: APIGameData[]) {
	await saveGenresToDatabase(games);
	await savePlatformsToDatabase(games);
}
