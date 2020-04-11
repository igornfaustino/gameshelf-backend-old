import jwt from 'jsonwebtoken';
import { Context } from '../types/graphQL';

const { APP_SECRET } = process.env;

interface jwtContent {
	userId: string;
}

export function getUserId(context: Context) {
	const Authorization = context.req.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = <jwtContent>jwt.verify(token, APP_SECRET!);
		return userId;
	}

	throw new Error('Not authenticated');
}
