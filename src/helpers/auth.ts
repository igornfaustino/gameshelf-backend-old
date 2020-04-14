import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../types/graphQL';
import { User } from '../database/models/user';

const { APP_SECRET } = process.env;

interface jwtContent {
	userId: string;
}

export async function getUserId(context: Context) {
	const Authorization = context.req.get('Authorization');

	if (!Authorization) throw new AuthenticationError('Not authenticated');

	const token = Authorization.replace('Bearer ', '');
	const { userId } = <jwtContent>jwt.verify(token, APP_SECRET!);
	const user = await User.findByPk(userId);

	if (!user) throw new AuthenticationError("User doesn't exists");

	return userId;
}
