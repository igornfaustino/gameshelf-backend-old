export interface APIGenericData {
	id: number;
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

export interface APIGenreData {
	name: string;
	id: number;
}

export interface APISimpleGameData {
	name: string;
	id: number;
	cover: APICoverData;
	genres: APIGenreData[];
	platforms?: APIPlatformData[];
}

export interface gamesAxiosResponse {
	data: APISimpleGameData[];
}

export interface Count {
	data: {
		count: number;
	};
}
