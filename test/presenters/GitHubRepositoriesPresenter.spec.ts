import { GitHubRepositoriesPresenter } from '../../src/presenters/GitHubRepositoriesPresenter';
import { GitHubRepositoryBuilder } from '../builders/GitHubRepositoryBuilder';

describe('GitHubRepositoriesPresenter', () => {
	describe('toMarkdown', () => {
		it('transforms the list of repositories into HTML', () => {
			const respositories = GitHubRepositoryBuilder.buildList(3);
			const subject = new GitHubRepositoriesPresenter(respositories);

			const html = subject.toMarkdown();

			expect(html)
				.toEqual(`- ⭐️⭐️⭐️ [${respositories[0].name}](${respositories[0].url}) ${respositories[0].stargazerCount}
- ⭐️⭐️ [${respositories[1].name}](${respositories[1].url}) ${respositories[1].stargazerCount}
- ⭐️ [${respositories[2].name}](${respositories[2].url}) ${respositories[2].stargazerCount}`);
		});
	});
});
