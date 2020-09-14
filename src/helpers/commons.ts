import {
	APISimpleGameData,
	APIGenreData,
	APIPlatformData,
	APIGenericData,
} from '../types/api';
import { GameAndList } from '../types/graphQL';
import { Game } from '../database/models/game';

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

const filterRepeatedAPIObjects = (
	object: APIGenericData,
	index: number,
	self: APIGenericData[],
) => index === self.findIndex((_object) => _object.id === object.id);

export const getUniquePlatforms = (games: APISimpleGameData[]) => {
	const platforms = games.reduce<APIPlatformData[]>((platformsIds, game) => {
		const gamePlatforms = game.platforms || [];
		return [...platformsIds, ...gamePlatforms];
	}, []);
	const uniquePlatforms = platforms.filter(filterRepeatedAPIObjects);
	return uniquePlatforms;
};

export const getUniqueGenres = (games: APISimpleGameData[]) => {
	const genres = games.reduce<APIGenreData[]>((genresIds, game) => {
		const gameGenres = game.genres || [];
		return [...genresIds, ...gameGenres];
	}, []);
	const uniqueGenres = genres.filter(filterRepeatedAPIObjects);
	return uniqueGenres;
};

export const apiGameToGraphQLFormat = (
	games: APISimpleGameData[],
): GameAndList[] =>
	games.map((game) => ({
		id: game.id,
		gameInfo: {
			id: game.id,
			name: game.name,
			genres: game.genres,
			platforms: game.platforms,
			coverURL: game.cover.url.slice(2).replace('t_thumb', 't_cover_big'),
		},
	}));

export const dbGameToGraphQLFormat = async (
	game: Game,
): Promise<GameAndList> => ({
	id: game.id,
	gameInfo: {
		id: game.id,
		name: game.name,
		genres: await game.$get('genres'),
		platforms: await game.$get('platforms'),
		coverURL: game.coverURL,
	},
});
