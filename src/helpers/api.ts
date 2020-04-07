import igdb from 'igdb-api-node';
import {
	APICoverData,
	APIGameData,
	APIGameDataWithCoverURL,
	APIPlatformData,
	APIGenreData,
} from '../types/api';
import { binarySearch } from './commons';
import { platform } from 'os';

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

export const getGenres = (platformsId: number[], limit: number = 50) =>
	client
		.fields(['id', 'name'])
		.limit(limit)
		.where(`id = (${platformsId.join(',')})`)
		.request('/genres')
		.then((res: { data: APIGenreData[] }) => {
			return res.data;
		})
		.catch((ex) => {
			throw ex;
		});

export const getPlatforms = (platformsId: number[], limit: number = 50) =>
	client
		.fields(['id', 'name', 'abbreviation'])
		.limit(limit)
		.where(`id = (${platformsId.join(',')})`)
		.request('/platforms')
		.then((res: { data: APIPlatformData[] }) => {
			return res.data;
		})
		.catch((ex) => {
			throw ex;
		});
