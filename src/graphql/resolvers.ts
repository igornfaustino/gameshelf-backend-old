import { searchGames } from '../controllers/api';
import { getGamePlatforms, getPlatforms } from '../controllers/platforms';
import { getGameGenres, getGenres } from '../controllers/genre';

module.exports = {
	Game: {
		platforms: getGamePlatforms,
		genres: getGameGenres,
	},
	Query: {
		searchGames,
		platforms: getPlatforms,
		genres: getGenres,
	},
};
