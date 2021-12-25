import type { Package, PackageVersion } from './api_types';

export interface Manager {
	name: string;
	transform: (Package, PackageVersion) => string;
}

export const managers: Manager[] = [
	{
		name: 'build.gradle.kts',
		transform: (pack: Package, version: PackageVersion) =>
			`implementation('${pack.group}:${pack.artifact}:${version.name}')`,
	},
	{
		name: 'build.gradle',
		transform: (pack: Package, version: PackageVersion) =>
			`implementation '${pack.group}:${pack.artifact}:${version.name}'`,
	},
	{
		name: 'pom.xml',
		transform: (pack: Package, version: PackageVersion) => `<dependency>
    <groupId>${pack.group}</groupId>
    <artifactId>${pack.artifact}</artifactId>
    <version>${version.name}</version>
</dependency>`,
	},
];
