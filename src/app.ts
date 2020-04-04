import express = require('express');
import cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type Query {
		hello: String
	}
`;

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		hello: () => 'Hello world!',
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: (request: express.Request) => ({ request }),
});

const app: express.Application = express();
const port = process.env.PORT || 4000;

app.use(cors());
server.applyMiddleware({ app, cors: false });

app.listen(port, () => {
	console.log(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
	);
});
