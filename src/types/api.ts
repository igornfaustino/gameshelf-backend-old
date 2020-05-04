export interface APIGameData {
	name: string;
	id: string;
	cover?: number | string;
	genres?: number[];
	platforms?: number[];
	similar_games: number[];
}

export interface APIGameDataExtraFields {
	name: string;
	id: string;
	cover?: string;
	genres?: number[];
	platforms?: number[];
	similar_games: number[];
	userList?: string;
}

// export interface APIGameDataWithCoverURLAndList {
// 	name: string;
// 	id: string;
// 	cover?: string;
// 	genres?: number[];
// 	platforms?: number[];
// 	similar_games: number[];
// 	userList?: string;
// }

export interface APICoverData {
	url: string;
	id: number;
}

export interface APIPlatformData {
	name: string;
	abbreviation: string;
	id: number;
}

export interface APIGenreData {
	name: string;
	id: number;
}

export interface gamesAxiosResponse {
	data: APIGameData[];
}

export interface Count {
	data: {
		count: number;
	};
}
