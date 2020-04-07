import { Sequelize } from 'sequelize-typescript';
import { Platform } from './models/platform';
import { Genre } from './models/genre';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const models = [Platform, Genre];

let sequelize: Sequelize;
sequelize = new Sequelize({
	...config,
	models,
});

export default sequelize;
