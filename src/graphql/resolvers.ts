import { searchGames } from '../controllers/api';
import { getGamePlatforms, getPlatforms } from '../controllers/platforms';
import { getGameGenres, getGenres } from '../controllers/genre';
import { getLists } from '../controllers/list';
import { singUp, login } from '../controllers/user';
import {
	getGamesFromList,
	addOrMoveGameToList,
	removeGameFromList,
	getSimilarGames,
	getGameList,
} from '../controllers/game';

module.exports = {
	Game: {
		platforms: getGamePlatforms,
		genres: getGameGenres,
		similarGames: getSimilarGames,
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
