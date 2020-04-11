import { searchGames } from '../controllers/api';
import { getGamePlatforms, getPlatforms } from '../controllers/platforms';
import { getGameGenres, getGenres } from '../controllers/genre';
import { getLists } from '../controllers/list';
import { singUp, login } from '../controllers/user';
import { getGamesFromList } from '../controllers/game';

module.exports = {
	Game: {
		platforms: getGamePlatforms,
		genres: getGameGenres,
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
	},
};
