'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Lists', [
			{
				name: 'To Play',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
			{
				name: 'Playing',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
			{
				name: 'Completed',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
			{
				name: 'Abandoned',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Lists', null, {});
	},
};
