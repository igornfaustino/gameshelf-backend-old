import igdb from 'igdb-api-node';
import { APICoverData, APIPlatformData, APIGenreData } from '../types/api';

const client = igdb(process.env.IGDB_API_KEY);

export const searchGameByName = (
	search: string,
	genres: undefined | number[],
	platforms: undefined | number[],
	limit: number = 50,
	offset: number = 0,
) => {
	let query = client
		.fields([
			'id',
			'name',
			'cover.url',
			'genres.name',
			'platforms.name',
			'platforms.abbreviation',
		])
		.limit(limit)
		.offset(offset)
		.search(search);
	const whereStatement = ['cover!=null'];
	if (genres) {
		whereStatement.push(`genres=(${genres.join(',')})`);
	}
	if (platforms) {
		whereStatement.push(`platforms=(${platforms.join(',')})`);
	}
	query.where(whereStatement.join('&'));
	return query.request('/games');
};

export const countSearchGameByName = (
	search: string,
	genres: undefined | number[],
	platforms: undefined | number[],
	limit: number = 50,
	offset: number = 0,
) => {
	let query = client.fields(['id']).limit(limit).offset(offset).search(search);
	const whereStatement = ['cover!=null'];
	if (genres) {
		whereStatement.push(`genres=(${genres.join(',')})`);
	}
	if (platforms) {
		whereStatement.push(`platforms=(${platforms.join(',')})`);
	}
	query.where(whereStatement.join('&'));
	return query.request('/games/count');
};

export const getGamesById = (gameIds: number[]) =>
	client
		.fields(['id', 'name', 'cover', 'genres', 'platforms'])
		.limit(gameIds.length)
		.where(`id = (${gameIds.join(',')})`)
		.request('/games');
