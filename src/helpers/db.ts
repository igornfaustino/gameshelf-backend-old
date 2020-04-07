import { getUniquePlatformsId, getUniqueGenresId } from './commons';
import { APIGameData } from '../types/api';
import { Platform } from '../database/models/platform';
import { getPlatforms } from './api';

const getPlatformIdsFromDatabase = async () => await Platform.findAll();

export const savePlatformsToDatabase = async (games: APIGameData[]) => {
	const requestPlatformSet = Array.from(getUniquePlatformsId(games));
	const databasePlatform = await (await getPlatformIdsFromDatabase()).map(
		(platform) => platform.id,
	);
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

export const saveGenresToDatabase = (games: APIGameData[]) => {
	const requestGenresSet = Array.from(getUniqueGenresId(games));
	console.log(requestGenresSet);
};
