import './database';
import express from 'express';
import cors from 'cors';
import { ApolloServer, UserInputError } from 'apollo-server-express';

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: (request: { req: express.Request }) => ({ req: request.req }),
	formatError: (err) => {
		if (err.message.startsWith('SQLITE_CONSTRAINT: ')) {
			return new UserInputError('Value send is unknown on the server');
		}
		return err;
	},
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
