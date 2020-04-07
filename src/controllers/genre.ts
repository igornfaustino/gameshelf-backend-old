import { getGenresFromIds } from '../helpers/db';

export const getGenres = async (
	_parents: Game,
	args: any,
	_context: any,
	_info: any,
) => {
	return getGenresFromIds(_parents.genresId || []);
};
