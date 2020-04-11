'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			'UserGameLists',
			{
				userId: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					references: {
						key: 'id',
						model: 'Users',
					},
				},
				gameId: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					references: {
						key: 'id',
						model: 'Games',
					},
				},
				ListId: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					references: {
						key: 'id',
						model: 'Lists',
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
			},
			{
				uniqueKeys: {
					Games_unique: {
						fields: ['userId', 'gameId'],
					},
				},
			},
		);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('UserGameLists');
	},
};
