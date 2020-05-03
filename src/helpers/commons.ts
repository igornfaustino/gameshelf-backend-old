import {
	APIGameData,
	APIGameDataWithCoverURL,
	APICoverData,
	APIGameDataWithCoverURLAndList,
} from '../types/api';
import { Game, GameIdAndList } from '../types/graphQL';
import { getAllListEntriesMatchedWithGames } from './db';

export function binarySearch<T>(
	list: T[],
	value: number,
	getValueToCompare: (element: T) => number,
): T | undefined {
	let start = 0;
	let end = list.length - 1;
	while (start <= end) {
		const middlePos = Math.floor((start + end) / 2);
		const middleElement = list[middlePos];
		if (getValueToCompare(middleElement) < value) {
			start = middlePos + 1;
		} else if (getValueToCompare(middleElement) > value) {
			end = middlePos - 1;
		} else {
			return list[middlePos];
		}
	}
}

export const getUniquePlatformsId = (games: APIGameData[]) =>
	new Set(
		games.reduce<number[]>((platformsIds, game) => {
			const gamePlatforms = game.platforms || [];
			return [...platformsIds, ...gamePlatforms];
		}, []),
	);

export const getUniqueGenresId = (games: APIGameData[]) =>
	new Set(
		games.reduce<number[]>((genresIds, game) => {
			const gameGenres = game.genres || [];
			return [...genresIds, ...gameGenres];
		}, []),
	);

export const apiGameToGraphQLFormat = (
	games: (
		| APIGameData
		| APIGameDataWithCoverURL
		| APIGameDataWithCoverURLAndList
	)[],
): Game[] =>
	games.map((game) => ({
		name: game.name,
		id: game.id,
		genresId: game.genres,
		platformsId: game.platforms,
		similarGames: game.similar_games,
		coverURL: game.cover?.toString(),
		userList: game.userList || undefined,
	}));

export const joinGamesAndCovers = (
	games: APIGameData[],
	covers: APICoverData[],
): APIGameDataWithCoverURL[] => {
	return games.map((game) => {
		const coverId = game.cover;
		if (!coverId)
			return {
				...game,
				cover: undefined,
			};
		const cover = binarySearch<APICoverData>(
			covers,
			coverId,
			(cover) => cover?.id,
		);
		if (!cover)
			return {
				...game,
				cover: undefined,
			};
		return {
			...game,
			cover: cover.url,
		};
	});
};

export const joinGamesAndUserLists = (
	games: APIGameDataWithCoverURL[],
	gameIdAndList: GameIdAndList[],
): APIGameDataWithCoverURLAndList[] => {
	return games.map((game) => {
		const gameId = game.id;
		const listItem = binarySearch<GameIdAndList>(
			gameIdAndList,
			parseInt(gameId),
			(item) => item?.gameId,
		);
		if (!listItem)
			return {
				...game,
				listName: undefined,
			};
		return {
			...game,
			userList: listItem.userList,
		};
	});
};
