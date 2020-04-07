import { Sequelize } from 'sequelize-typescript';
import { Model } from 'sequelize/types';
import { Platform } from './models/platform';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const models = [Platform];

let sequelize: Sequelize;
sequelize = new Sequelize({
	...config,
	models,
});

export default sequelize;
