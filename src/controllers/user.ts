import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserArgs, LoginArgs } from '../types/graphQL';
import { User } from '../database/models/user';

const { APP_SECRET } = process.env;

export const singUp = async (
	_parent: undefined,
	{ name, email, password }: UserArgs,
) => {
	const encryptedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		name,
		email,
		password: encryptedPassword,
	});

	const token = jwt.sign({ userId: user.id }, APP_SECRET!);
	return {
		token,
		user,
	};
};

export const login = async (
	parent: undefined,
	{ email, password }: LoginArgs,
) => {
	const user = await User.findOne({ where: { email: email } });
	if (!user) {
		throw new Error('No such user found');
	}

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		throw new Error('Invalid password');
	}

	const token = jwt.sign({ userId: user.id }, APP_SECRET!);

	return {
		token,
		user,
	};
};
