import express = require('express');
import cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

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
