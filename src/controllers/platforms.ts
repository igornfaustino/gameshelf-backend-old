import { getPlatformsFromIds, getAllPlatforms } from '../helpers/db';
import { Game as GameType } from '../types/graphQL';
import { Game as GameModel } from '../database/models/game';

export const getGamePlatforms = async (parents: GameType | GameModel) => {
	if (parents instanceof GameModel) return parents.$get('platforms');
	return getPlatformsFromIds(parents.platformsId || []);
};

export const getPlatforms = () => {
	return getAllPlatforms();
};
