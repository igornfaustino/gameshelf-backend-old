module.exports.development = {
	dialect: 'sqlite',
	storage: './database.sqlite3',
};

module.exports.production = {
	url: process.env.DATABASE_URL,
	dialect: 'postgres',
};
