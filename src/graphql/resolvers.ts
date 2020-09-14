import { searchGames } from '../controllers/igdb';
import { getPlatforms, getGamePlatforms } from '../controllers/platforms';
import { getGenres, getGameGenres } from '../controllers/genre';
import { getLists } from '../controllers/list';
import { singUp, login } from '../controllers/user';
import {
	getGamesFromList,
	addOrMoveGameToList,
	removeGameFromList,
	getGameList,
} from '../controllers/game';

module.exports = {
	// GameSimplified: {
	// 	genres: getGameGenres,
	// 	platforms: getGamePlatforms,
	// },
	GameAndList: {
		list: getGameList,
	},
	Query: {
		searchGames,
		getGamesFromList,
		platforms: getPlatforms,
		genres: getGenres,
		lists: getLists,
	},
	Mutation: {
		singUp,
		login,
		addOrMoveGameToList,
		removeGameFromList,
	},
};
