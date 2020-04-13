'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('RelatedGames', {
			gameId: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'Games',
				},
			},
			relatedGameId: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'Games',
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
		return queryInterface.dropTable('RelatedGames');
	},
};
