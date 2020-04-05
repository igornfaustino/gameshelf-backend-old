const { gql } = require('apollo-server-express');

module.exports = gql`
	type Game {
		id: ID
		name: String
		coverURL: String
		genres: [String]
		platforms: [String]
		similar_games: [Game]
	}
	type Query {
		searchGame(search: String!, plataform: Int, limit: Int, offset: Int): [Game]
	}
`;
