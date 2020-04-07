const { gql } = require('apollo-server-express');

module.exports = gql`
	type Platform {
		id: ID
		name: String!
		abbreviation: String
	}
	type Game {
		id: ID
		name: String
		coverURL: String
		genres: [String]
		platforms: [Platform]
		similarGames: [Game]
	}
	type Query {
		searchGames(
			search: String!
			plataform: Int
			limit: Int
			offset: Int
		): [Game]
	}
`;
