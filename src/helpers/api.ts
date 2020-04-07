import igdb from 'igdb-api-node';
import {
	APICoverData,
	APIGameData,
	APIGameDataWithCoverURL,
} from '../types/api';
import { binarySearch } from './commons';

const client = igdb(process.env.IGDB_API_KEY);

interface searchOption {
	search: string;
	limit?: number;
	offset?: number;
}
export const searchGameByName = (
	search: string,
	limit: number = 50,
	offset: number = 0,
) =>
	client
		.fields(['id', 'name', 'cover', 'genres', 'platforms', 'similar_games'])
		.limit(limit)
		.offset(offset)
		.search(search)
		.request('/games');

export const getCovers = (
	coversId: number[],
	limit: number = 50,
	offset: number = 0,
) =>
	client
		.fields(['id', 'url'])
		.limit(limit)
		.offset(offset)
		.where(`id = (${coversId.join(',')})`)
		.request('/covers')
		.then((res: { data: APICoverData[] }) => {
			return res.data
				.map((cover) => ({
					...cover,
					url: cover.url.slice(2).replace('t_thumb', 't_cover_big'),
				}))
				.sort((a, b) => a.id - b.id);
		})
		.catch((ex) => {
			throw ex;
		});

export const apiGameToGraphQLFormat = (
	games: (APIGameData | APIGameDataWithCoverURL)[],
) =>
	games.map((game) => ({
		name: game.name,
		id: game.id,
		genres: game.genres,
		platforms: game.platforms,
		similarGames: game.similar_games,
		coverURL: game.cover,
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
		console.log(cover);
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
