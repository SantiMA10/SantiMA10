import { GitHubDriver } from '../../src/drivers/GitHubDriver';
import { GetTopRepositories } from '../../src/useCase/GetTopRepositories';
import { GitHubRepositoryBuilder } from '../builders/GitHubRepositoryBuilder';

describe('GetTopRepositories', () => {
	describe('#execute', () => {
		it('returns my top repositories', async () => {
			const repositories = GitHubRepositoryBuilder.buildList(1);
			const fakeDriver = {
				getRepositories: async () => repositories,
			};
			const subject = new GetTopRepositories(fakeDriver as GitHubDriver);

			const { data } = await subject.execute();

			expect(data).toEqual(repositories);
		});
	});
});
