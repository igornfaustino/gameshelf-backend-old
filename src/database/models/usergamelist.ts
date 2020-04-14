import {
	Table,
	Column,
	Model,
	ForeignKey,
	HasOne,
	BelongsTo,
} from 'sequelize-typescript';
import { Game } from './game';
import { User } from './user';
import { List } from './list';

@Table
export class UserGameList extends Model<UserGameList> {
	@ForeignKey(() => User)
	@Column
	userId!: number;

	@ForeignKey(() => Game)
	@Column
	gameId!: number;

	@ForeignKey(() => List)
	@Column
	listId!: number;

	@BelongsTo(() => Game)
	game!: Game;

	@BelongsTo(() => List, 'listId')
	list!: List;

	@BelongsTo(() => User)
	user!: User;
}
