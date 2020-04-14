import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserGameList } from './usergamelist';

@Table({
	tableName: 'lists',
})
export class List extends Model<List> {
	@Column({
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataType.INTEGER.UNSIGNED,
	})
	id!: number;

	@Column
	name!: string;

	@HasMany(() => UserGameList, 'listId')
	userLists!: UserGameList[];
}
