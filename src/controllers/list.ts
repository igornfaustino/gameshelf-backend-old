import { getAllLists } from '../helpers/db';
import { getUserId } from '../helpers/auth';
import { Context } from '../types/graphQL';

export const getLists = async (_1: any, _2: any, context: Context) => {
	const userId = await getUserId(context);
	return getAllLists(Number(userId));
};
