import { searchGames } from '../controllers/api';
import { getPlatforms } from '../controllers/platforms';

module.exports = {
	Game: {
		platforms: getPlatforms,
	},
	Query: {
		searchGames,
	},
};
