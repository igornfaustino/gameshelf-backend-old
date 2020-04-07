import { getUniquePlatformsId, getUniqueGenresId } from './commons';
import { APIGameData } from '../types/api';
import { Platform } from '../database/models/platform';
import { getPlatforms, getGenres } from './api';
import { Genre } from '../database/models/genre';

const getPlatformIdsFromDatabase = async () =>
	(await Platform.findAll()).map((platform) => platform.id);

const getGenresIdsFromDatabase = async () =>
	(await Genre.findAll()).map((genre) => genre.id);

export const savePlatformsToDatabase = async (games: APIGameData[]) => {
	const requestPlatformSet = Array.from(getUniquePlatformsId(games));
	const databasePlatform = await getPlatformIdsFromDatabase();
	const idMissingInDatabase = requestPlatformSet
		.filter((id) => databasePlatform.indexOf(parseInt(id)) == -1)
		.map((id) => parseInt(id));
	if (idMissingInDatabase.length == 0) return;
	const platforms = await getPlatforms(
		idMissingInDatabase,
		idMissingInDatabase.length,
	);
	await Platform.bulkCreate(platforms);
};

export const saveGenresToDatabase = async (games: APIGameData[]) => {
	const requestGenresSet = Array.from(getUniqueGenresId(games));
	const databaseGenres = await getGenresIdsFromDatabase();
	const idMissingInDatabase = requestGenresSet
		.filter((id) => databaseGenres.indexOf(parseInt(id)) == -1)
		.map((id) => parseInt(id));
	if (idMissingInDatabase.length == 0) return;
	const genres = await getGenres(
		idMissingInDatabase,
		idMissingInDatabase.length,
	);
	await Genre.bulkCreate(genres);
};

export const getPlatformsFromIds = (ids: string[]) =>
	Platform.findAll({ where: { id: ids } });

export const getGenresFromIds = (ids: string[]) =>
	Genre.findAll({ where: { id: ids } });
