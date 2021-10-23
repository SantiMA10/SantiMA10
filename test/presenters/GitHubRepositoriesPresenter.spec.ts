import { GitHubRepositoriesPresenter } from '../../src/presenters/GitHubRepositoriesPresenter';
import { GitHubRepositoryBuilder } from '../builders/GitHubRepositoryBuilder';

describe('GitHubRepositoriesPresenter', () => {
	describe('toMarkdown', () => {
		it('transforms the list of repositories into HTML', () => {
			const repositories = GitHubRepositoryBuilder.buildList(3);
			const subject = new GitHubRepositoriesPresenter(repositories);

			const html = subject.toMarkdown();

			expect(html)
				.toEqual(`- ⭐️⭐️⭐️ [${repositories[0].owner.login}/${repositories[0].name}](${repositories[0].url}) ${repositories[0].stargazerCount}
- ⭐️⭐️ [${repositories[1].owner.login}/${repositories[1].name}](${repositories[1].url}) ${repositories[1].stargazerCount}
- ⭐️ [${repositories[2].owner.login}/${repositories[2].name}](${repositories[2].url}) ${repositories[2].stargazerCount}`);
		});
	});
});
