export interface SearchArgs {
	search: string;
	offset?: number;
	limit?: number;
}

export interface APIGameData {
	name: string;
	id: string;
	cover?: number;
	genres?: string[];
	platforms?: string[];
	similar_games: string[];
}

export interface APIGameDataWithCoverURL {
	name: string;
	id: string;
	cover?: string;
	genres?: string[];
	platforms?: string[];
	similar_games: string[];
}

export interface APICoverData {
	url: string;
	id: number;
}

export interface APIPlatformData {
	name: string;
	abbreviation: string;
	id: number;
}
