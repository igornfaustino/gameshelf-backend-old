import express from 'express';

interface Platform {
	id: string;
	name: string;
	abbreviation?: string;
}

interface Genres {
	id: string;
	name: string;
}

export interface Game {
	id: string;
	name: string;
	coverURL?: string;
	genresId?: number[];
	genres?: Genres[];
	platforms?: Platform[];
	platformsId?: number[];
	similarGames?: number[];
	userList?: string;
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
