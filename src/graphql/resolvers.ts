import { searchGames } from '../controllers/api';
import { getGamePlatforms, getPlatforms } from '../controllers/platforms';
import { getGenres } from '../controllers/genre';

module.exports = {
	Game: {
		platforms: getGamePlatforms,
		genres: getGenres,
	},
	Query: {
		searchGames,
		platforms: getPlatforms,
	},
};
