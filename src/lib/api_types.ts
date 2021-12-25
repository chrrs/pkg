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
	website?: string;
	group: string;
	artifact: string;
	repository?: string;
	readme?: string;
	latestVersion: PackageVersion;
	versions: PackageVersion[];
}

export interface PackageVersion {
	name: string;
	updated: number;
	stable: boolean;
}
