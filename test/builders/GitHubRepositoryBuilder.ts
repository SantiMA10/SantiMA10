import * as Factory from 'factory.ts';
import { internet, random } from 'faker';

import { GitHubRepository } from '../../src/entities/GitHubRepository';

export const GitHubRepositoryBuilder = Factory.Sync.makeFactory<GitHubRepository>({
	owner: {
		login: internet.userName(),
	},
	name: random.word(),
	url: internet.url(),
	stargazerCount: random.number(),
});
