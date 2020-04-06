import { Sequelize } from 'sequelize-typescript';
import { Model } from 'sequelize/types';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const models: Model[] = [];

let sequelize: Sequelize;
sequelize = new Sequelize({
	...config,
	models,
});

export default sequelize;
