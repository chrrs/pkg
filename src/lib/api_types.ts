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
	latestVersion: PackageVersion;
}

export interface Package {
	name: string;
	description?: string;
	website?: string;
	group: string;
	artifact: string;
	scm?: string;
	readme?: string;
	latestVersion: PackageVersion;
	versions: PackageVersion[];
}

export interface PackageVersion {
	name: string;
	updated: number;
	stable: boolean;
	repository?: PackageRepository;
}

export interface PackageRepository {
	name: string;
	id: string;
	url: string;
}
