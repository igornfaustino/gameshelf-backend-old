import { getPlatformsFromIds, getAllPlatforms } from '../helpers/db';

export const getGamePlatforms = async (
	_parents: Game,
	args: any,
	_context: any,
	_info: any,
) => {
	return getPlatformsFromIds(_parents.platformsId || []);
};

export const getPlatforms = async (
	_parents: undefined,
	args: undefined,
	_context: any,
	_info: undefined,
) => {
	return getAllPlatforms();
};
