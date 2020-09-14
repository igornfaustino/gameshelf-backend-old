import { Sequelize } from 'sequelize-typescript';
import { Platform } from './models/platform';
import { Genre } from './models/genre';
import { Game } from './models/game';
import { GamePlatform } from './models/gamePlatform';
import { GameGenre } from './models/gameGenre';
import { List } from './models/list';
import { User } from './models/user';
import { UserGameList } from './models/usergamelist';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const models = [
	Game,
	Platform,
	Genre,
	GamePlatform,
	GameGenre,
	List,
	User,
	UserGameList,
];

let sequelize: Sequelize;
if (env === 'production') {
	const { url, sequelizeOptions } = config;
	sequelize = new Sequelize(url, {
		...sequelizeOptions,
		logging: false,
		models,
	});
} else {
	sequelize = new Sequelize({
		...config,
		logging: true,
		models,
	});
}

export default sequelize;
