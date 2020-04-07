import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
	tableName: 'genres',
})
export class Genre extends Model<Genre> {
	@Column({
		allowNull: false,
		autoIncrement: false,
		primaryKey: true,
		type: DataType.INTEGER.UNSIGNED,
	})
	id!: number;

	@Column
	name!: string;
}
