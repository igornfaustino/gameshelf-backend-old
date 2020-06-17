import { gql } from 'apollo-server-express';

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
	type List {
		id: ID
		name: String
	}
	type Game {
		id: ID
		name: String
		coverURL: String
		genres: [Genre]
		platforms: [Platform]
		similarGames: [ID]
		list: List
	}
	type Search {
		games: [Game]
		count: Int
	}
	type ListAndCount {
		list: List
		count: Int
	}
	type Query {
		searchGames(
			search: String!
			platforms: [Int]
			genres: [Int]
			limit: Int
			offset: Int
		): Search
		getGamesFromList(
			listId: ID
			platforms: [Int]
			genres: [Int]
			limit: Int
			offset: Int
		): Search
		platforms: [Platform]
		genres: [Genre]
		lists: [ListAndCount]
	}
	type Mutation {
		singUp(name: String!, email: String!, password: String!): AuthPayload!
		login(email: String!, password: String!): AuthPayload!
		addOrMoveGameToList(
			gameId: ID!
			listId: ID!
			name: String!
			coverURL: String!
			genres: [ID]!
			platforms: [ID]!
			similarGames: [ID]!
		): Game
		removeGameFromList(gameId: ID!): Game
	}
`;
