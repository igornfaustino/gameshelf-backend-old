import express from 'express';

export interface Platform {
	id: number;
	name: string;
	abbreviation?: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface GameAndList {
	id: number;
	list?: List;
	gameInfo: GameSimplified;
}

export interface GameSimplified {
	id: number;
	name: string;
	coverURL?: string;
	genres?: Genre[];
	platforms?: Platform[];
}

export interface SearchArgs {
	search: string;
	offset?: number;
	limit?: number;
	platforms?: number[];
	genres?: number[];
}

export interface UserArgs {
	name: string;
	email: string;
	password: string;
}

export interface LoginArgs {
	email: string;
	password: string;
}

export interface Context {
	req: express.Request;
}

export interface addOrMoveGameArgs {
	gameId: number;
	listId: number;
	name: string;
	coverURL: string;
	genres: number[];
	platforms: number[];
	similarGames: number[];
}

export interface GameIdAndList {
	gameId: number;
	userList?: string;
}

export interface List {
	id?: number;
	name?: string;
}
