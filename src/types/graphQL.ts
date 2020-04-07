interface Platform {
	id: string;
	name: string;
	abbreviation?: string;
}

interface Game {
	id: string;
	name: string;
	coverURL?: string;
	genres?: string[];
	platforms?: Platform[];
	platformsId?: string[];
	similarGames?: Game[];
	similarGamesId?: string[];
}
