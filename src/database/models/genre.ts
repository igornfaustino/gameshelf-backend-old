import {
	Table,
	Column,
	Model,
	DataType,
	BelongsToMany,
} from 'sequelize-typescript';
import { Game } from './game';
import { GameGenre } from './gameGenre';

@Table
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

	@BelongsToMany(() => Game, () => GameGenre, 'genreId')
	games!: Game[];
}
