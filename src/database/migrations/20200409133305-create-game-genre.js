'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('GameGenres', {
			gameId: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'Games',
				},
			},
			genreId: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'Genres',
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('GameGenres');
	},
};
