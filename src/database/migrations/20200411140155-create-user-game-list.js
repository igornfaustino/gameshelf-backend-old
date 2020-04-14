'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			'UserGameLists',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					type: Sequelize.INTEGER,
					references: {
						key: 'id',
						model: 'Users',
					},
				},
				gameId: {
					type: Sequelize.INTEGER,
					references: {
						key: 'id',
						model: 'Games',
					},
				},
				listId: {
					type: Sequelize.INTEGER,
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
