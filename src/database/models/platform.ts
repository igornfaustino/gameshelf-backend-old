import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
	tableName: 'platforms',
})
export class Platform extends Model<Platform> {
	@Column({
		allowNull: false,
		autoIncrement: false,
		primaryKey: true,
		type: DataType.INTEGER.UNSIGNED,
	})
	id!: number;

	@Column
	name!: string;

	@Column
	abbreviation!: string;
}
