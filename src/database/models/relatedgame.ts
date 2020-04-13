import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Game } from './game';

@Table
export class RelatedGame extends Model<RelatedGame> {
	@ForeignKey(() => Game)
	@Column({
		primaryKey: true,
	})
	relatedGameId!: number;

	@ForeignKey(() => Game)
	@Column({
		primaryKey: true,
	})
	gameId!: number;
}
