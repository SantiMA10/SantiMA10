import { GitHubRepository } from '../entities/GitHubRepository';

export class GitHubRepositoriesPresenter {
	public constructor(private repositories: GitHubRepository[]) {}

	public toMarkdown(): string {
		return this.repositories
			.map((repository, index) => {
				return `- ${this.stargazerCount(index)} [${repository.owner.login}/${repository.name}](${
					repository.url
				}) ${repository.stargazerCount}`;
			})
			.join('\n');
	}

	private stargazerCount(count: number) {
		switch (count) {
			case 0:
				return '⭐️⭐️⭐️';
			case 1:
				return '⭐️⭐️';
			default:
				return '⭐️';
		}
	}
}
