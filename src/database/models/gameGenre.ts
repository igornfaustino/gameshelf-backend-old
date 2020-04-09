import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Game } from './game';
import { Genre } from './genre';

@Table
export class GameGenre extends Model<GameGenre> {
	@ForeignKey(() => Genre)
	@Column
	genreId!: number;

	@ForeignKey(() => Game)
	@Column
	gameId!: number;
}
