import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
	tableName: 'users',
})
export class User extends Model<User> {
	@Column({
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataType.INTEGER.UNSIGNED,
	})
	id!: number;

	@Column
	name!: string;

	@Column({
		unique: true,
	})
	email!: string;

	@Column
	password!: string;
}
