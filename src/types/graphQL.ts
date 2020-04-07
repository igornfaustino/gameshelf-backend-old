interface Platform {
	id: string;
	name: string;
	abbreviation?: string;
}

interface Genres {
	id: string;
	name: string;
}

interface Game {
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
