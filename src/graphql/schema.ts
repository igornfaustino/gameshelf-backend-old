const { gql } = require('apollo-server-express');

module.exports = gql`
	type AuthPayload {
		token: String
		user: User
	}
	type User {
		name: String!
		email: String!
	}
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
		similarGames: [ID]
	}
	type List {
		id: ID
		name: String
	}
	type Query {
		searchGames(
			search: String!
			platforms: [Int]
			genres: [Int]
			limit: Int
			offset: Int
		): [Game]
		getGamesFromList(listId: ID): [Game]
		platforms: [Platform]
		genres: [Genre]
		lists: [List]
	}
	type Mutation {
		singUp(name: String!, email: String!, password: String!): AuthPayload!
		login(email: String!, password: String!): AuthPayload!
		addOrMoveGameToList(
			id: ID!
			listId: ID!
			name: String
			coverURL: String
			genres: [ID]
			platforms: [ID]
			similarGames: [ID]
		): Boolean
	}
`;
