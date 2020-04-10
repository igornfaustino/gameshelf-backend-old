import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
}
