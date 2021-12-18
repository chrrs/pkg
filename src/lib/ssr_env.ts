import { browser } from '$app/env';
import dotenv from 'dotenv';

export let env: { [key: string]: string } = {};
if (!browser) {
	env = dotenv.config().parsed;
}
