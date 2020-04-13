import {
	APIGameData,
	APIGameDataWithCoverURL,
	APICoverData,
} from '../types/api';
import { Game } from '../types/graphQL';

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
		games.reduce<string[]>((platformsIds, game) => {
			const gamePlatforms = game.platforms || [];
			return [...platformsIds, ...gamePlatforms];
		}, []),
	);

export const getUniqueGenresId = (games: APIGameData[]) =>
	new Set(
		games.reduce<string[]>((genresIds, game) => {
			const gameGenres = game.genres || [];
			return [...genresIds, ...gameGenres];
		}, []),
	);

export const apiGameToGraphQLFormat = (
	games: (APIGameData | APIGameDataWithCoverURL)[],
): Game[] =>
	games.map((game) => ({
		name: game.name,
		id: game.id,
		genresId: game.genres,
		platformsId: game.platforms,
		similarGames: game.similar_games,
		coverURL: game.cover?.toString(),
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
