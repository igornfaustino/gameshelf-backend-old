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
	genresId?: string[];
	genres?: Genres[];
	platforms?: Platform[];
	platformsId?: string[];
	similarGames?: Game[];
	similarGamesId?: string[];
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
