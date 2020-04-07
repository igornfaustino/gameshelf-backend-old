import { getPlatformsFromIds } from '../helpers/db';

export const getPlatforms = async (
	_parents: Game,
	args: any,
	_context: any,
	_info: any,
) => {
	return getPlatformsFromIds(_parents.platformsId || []);
};
