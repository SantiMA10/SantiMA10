import { GitHubDriver } from '../drivers/GitHubDriver';
import { GitHubRepository } from '../entities/GitHubRepository';

export class GetTopRepositories {
	public constructor(private driver: GitHubDriver) {}

	public async execute(): Promise<{ data: GitHubRepository[] }> {
		return {
			data: await this.driver.getRepositories(),
		};
	}
}
