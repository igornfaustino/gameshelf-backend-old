import { getGenresFromIds, getAllGenres } from '../helpers/db';
import { Game as GameType } from '../types/graphQL';
import { Game as GameModel } from '../database/models/game';

export const getGameGenres = async (parents: GameModel | GameType) => {
	if (parents instanceof GameModel) return parents.$get('genres');
	return getGenresFromIds(parents.genresId || []);
};

export const getGenres = () => getAllGenres();
