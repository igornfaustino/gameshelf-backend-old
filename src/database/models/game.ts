import {
	Table,
	Column,
	Model,
	DataType,
	BelongsToMany,
} from 'sequelize-typescript';
import { Platform } from './platform';
import { GamePlatform } from './gamePlatform';
import { Genre } from './genre';
import { GameGenre } from './gameGenre';

@Table({
	tableName: 'games',
})
export class Game extends Model<Game> {
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
	coverUrl!: string;

	@BelongsToMany(() => Platform, () => GamePlatform, 'gameId')
	platforms!: Platform[];

	@BelongsToMany(() => Genre, () => GameGenre, 'gameId')
	genres!: Genre[];
}
