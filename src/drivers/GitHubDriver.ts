import type { GraphQlQueryResponseData } from '@octokit/graphql';
import { graphql } from '@octokit/graphql';

import { GitHubRepository } from '../entities/GitHubRepository';

export class GitHubDriver {
	public constructor(private config: { token: string }) {}

	public async getRepositories(): Promise<GitHubRepository[]> {
		try {
			const data = await graphql<GraphQlQueryResponseData>(
				`
					{
						repositoryOwner(login: "SantiMA10") {
							repositories(
								orderBy: { field: STARGAZERS, direction: DESC }
								first: 3
								ownerAffiliations: [OWNER]
							) {
								nodes {
									owner {
										id
										login
									}
									name
									stargazerCount
									url
								}
							}
						}
					}
				`,
				{
					headers: {
						authorization: `token ${this.config.token}`,
					},
				},
			);

			return data['repositoryOwner']['repositories']['nodes'];
		} catch (e) {
			console.error(e);
			return [];
		}
	}
}
