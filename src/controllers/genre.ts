import { getAllGenres } from '../helpers/db';
import { GameSimplified } from '../types/graphQL';
import { Game as GameModel } from '../database/models/game';

export const getGameGenres = async (parents: GameModel | GameSimplified) => {
	if (parents instanceof GameModel) return parents.$get('genres');
	return parents.genres || [];
};

export const getGenres = () => getAllGenres();
