import {
	Table,
	Column,
	Model,
	DataType,
	BelongsToMany,
} from 'sequelize-typescript';
import { Game } from './game';
import { GamePlatform } from './gamePlatform';

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

	@BelongsToMany(() => Game, () => GamePlatform, 'platformId')
	games!: Game[];
}
