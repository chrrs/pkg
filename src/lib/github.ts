import { env } from './ssr_env';

export async function getContent(contentUrl: string): Promise<string | undefined> {
	const res = await fetch(contentUrl, {
		headers: {
			Authorization: env.GITHUB_TOKEN && `Token ${env.GITHUB_TOKEN}`,
		},
	}).then((res) => res.json());

	if (res.content) {
		return Buffer.from(res.content, res.encoding).toString('ascii');
	}
}

export async function getReadme(baseUrl: string): Promise<string | undefined> {
	const res = await fetch(`${baseUrl}/blob/master/README.md?raw=true`);

	if (res.status != 404) {
		return await res.text();
	}
}
