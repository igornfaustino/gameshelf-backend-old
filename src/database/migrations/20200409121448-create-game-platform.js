'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('GamePlatforms', {
			gameId: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'Games',
				},
			},
			platformId: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'Platforms',
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
		return queryInterface.dropTable('GamePlatforms');
	},
};
