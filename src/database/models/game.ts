import {
	Table,
	Column,
	Model,
	DataType,
	BelongsToMany,
	HasMany,
} from 'sequelize-typescript';
import { Platform } from './platform';
import { GamePlatform } from './gamePlatform';
import { Genre } from './genre';
import { GameGenre } from './gameGenre';
import { RelatedGame } from './relatedgame';
import { UserGameList } from './usergamelist';

@Table
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
	coverURL!: string;

	@BelongsToMany(() => Platform, () => GamePlatform, 'gameId')
	platforms!: Platform[];

	@BelongsToMany(() => Genre, () => GameGenre, 'gameId')
	genres!: Genre[];

	@BelongsToMany(() => Game, () => RelatedGame, 'gameId')
	relatedGames!: Game[];

	@HasMany(() => UserGameList, 'gameId')
	userLists!: UserGameList[];
}
