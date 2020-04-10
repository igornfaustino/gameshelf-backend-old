const { gql } = require('apollo-server-express');

module.exports = gql`
	type Genre {
		id: ID
		name: String!
	}
	type Platform {
		id: ID
		name: String!
		abbreviation: String
	}
	type Game {
		id: ID
		name: String
		coverURL: String
		genres: [Genre]
		platforms: [Platform]
		similarGames: [Game]
	}
	type List {
		id: ID
		name: String
	}
	type Query {
		searchGames(search: String!, platform: Int, limit: Int, offset: Int): [Game]
		platforms: [Platform]
		genres: [Genre]
		lists: [List]
	}
`;
