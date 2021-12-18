export interface ApiError {
	error: string;
}

export interface SearchResults {
	amount: number;
	results: SearchResult[];
}

export interface SearchResult {
	name: string;
	description?: string;
	group: string;
	artifact: string;
	version: string;
	lastUpdated: number;
}

export interface Package {
	name: string;
	description?: string;
	group: string;
	artifact: string;
	repository?: string;
	readme?: string;
}
