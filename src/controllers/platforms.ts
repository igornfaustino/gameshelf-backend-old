import { getPlatformsFromIds, getAllPlatforms } from '../helpers/db';

export const getGamePlatforms = async (_parents: Game) => {
	return getPlatformsFromIds(_parents.platformsId || []);
};

export const getPlatforms = () => {
	return getAllPlatforms();
};
