import nock from 'nock';

import { GitHubDriver } from '../../src/drivers/GitHubDriver';
import { GitHubRepository } from '../../src/entities/GitHubRepository';
import { GitHubRepositoryBuilder } from '../builders/GitHubRepositoryBuilder';

const mockRepositoriesRequest = (repositories: GitHubRepository[]) => {
	return nock('https://api.github.com')
		.post('/graphql')
		.reply(200, {
			data: {
				repositoryOwner: {
					repositories: {
						nodes: repositories,
					},
				},
			},
		});
};

describe('GitHubDriver', () => {
	describe('#getRepositories', () => {
		it('returns the list of repositories with more stargazer', async () => {
			const repositories = GitHubRepositoryBuilder.buildList(3);
			mockRepositoriesRequest(repositories);
			const subject = new GitHubDriver({ token: 'token' });

			const response = await subject.getRepositories();

			expect(response).toEqual(repositories);
		});

		it('returns an empty list if something goes wrong with the request', async () => {
			nock('https://api.github.com').post('/graphql').reply(400, 'error');
			const subject = new GitHubDriver({ token: 'token' });

			const repositories = await subject.getRepositories();

			expect(repositories).toBeEmpty();
		});
	});
});
