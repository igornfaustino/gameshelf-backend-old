import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Platform } from './platform';
import { Game } from './game';

@Table
export class GamePlatform extends Model<GamePlatform> {
	@ForeignKey(() => Platform)
	@Column
	platformId!: number;

	@ForeignKey(() => Game)
	@Column
	gameId!: number;
}
