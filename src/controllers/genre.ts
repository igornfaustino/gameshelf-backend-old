import { getGenresFromIds, getAllGenres } from '../helpers/db';

export const getGameGenres = async (_parents: Game) => {
	return getGenresFromIds(_parents.genresId || []);
};

export const getGenres = () => getAllGenres();
