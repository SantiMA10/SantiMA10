export interface GitHubRepository {
	owner: {
		login: string;
	};
	name: string;
	stargazerCount: number;
	url: string;
}
