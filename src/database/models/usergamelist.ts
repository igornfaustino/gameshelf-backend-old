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
	@Column({
		primaryKey: true,
	})
	userId!: number;

	@ForeignKey(() => Game)
	@Column({
		primaryKey: true,
	})
	gameId!: number;

	@ForeignKey(() => List)
	@Column({
		primaryKey: true,
	})
	listId!: number;

	@BelongsTo(() => Game)
	game!: Game;
}
