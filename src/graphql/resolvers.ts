import { searchGames } from '../controllers/api';
import { getPlatforms } from '../controllers/platforms';
import { getGenres } from '../controllers/genre';

module.exports = {
	Game: {
		platforms: getPlatforms,
		genres: getGenres,
	},
	Query: {
		searchGames,
	},
};
