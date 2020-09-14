import { getAllPlatforms } from '../helpers/db';
import { GameSimplified } from '../types/graphQL';
import { Game as GameModel } from '../database/models/game';

export const getGamePlatforms = async (parents: GameSimplified | GameModel) => {
	if (parents instanceof GameModel) return parents.$get('platforms');
	return parents.platforms || [];
};

export const getPlatforms = () => {
	return getAllPlatforms();
};
