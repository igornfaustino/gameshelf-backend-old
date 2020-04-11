import { Sequelize } from 'sequelize-typescript';
import { Platform } from './models/platform';
import { Genre } from './models/genre';
import { Game } from './models/game';
import { GamePlatform } from './models/gamePlatform';
import { GameGenre } from './models/gameGenre';
import { List } from './models/list';
import { User } from './models/user';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const models = [Game, Platform, Genre, GamePlatform, GameGenre, List, User];

let sequelize: Sequelize;
sequelize = new Sequelize({
	...config,
	logging: false,
	models,
});

export default sequelize;
