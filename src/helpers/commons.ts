import { APIGameData } from '../types/api';

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
