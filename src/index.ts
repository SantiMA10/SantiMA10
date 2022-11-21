import fs from 'fs';

import { GitHubDriver } from './drivers/GitHubDriver';
import { TwitchDriver } from './drivers/TwitchDriver';
import { FetchHttpDriver } from './infrastructure/FetchHttpDriver';
import { HttpBlogPostRepository } from './infrastructure/HttpBlogPostRepository';
import { BlogPostPresenter } from './presenters/BlogPostPresenter';
import { GitHubRepositoriesPresenter } from './presenters/GitHubRepositoriesPresenter';
import { TwitchVideoPresenter } from './presenters/TwitchVideoPresenter';
import { GetLastBlogPosts } from './useCase/GetLastBlogPosts';
import { GetLastStreaming } from './useCase/GetLastStreaming';
import { GetTopRepositories } from './useCase/GetTopRepositories';

const updateTwitch = async () => {
	const { data: posts } = await new GetLastBlogPosts(
		new HttpBlogPostRepository(new FetchHttpDriver()),
	).execute();

	const twitchDriver = new TwitchDriver({
		clientId: process.env.TWITCH_CLIENT_ID || '',
		clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
	});
	const { data } = await new GetLastStreaming(twitchDriver).execute({
		userId: process.env.TWITCH_USER_ID || '',
	});

	const gitHubDriver = new GitHubDriver({
		token: process.env.GITHUB_TOKEN || '',
	});
	const { data: repositories } = await new GetTopRepositories(gitHubDriver).execute();

	const readme = fs.readFileSync(`${__dirname}/README.base.md`).toString();

	const htmlVideo = data
		.slice(0, 3)
		.map((video) => {
			return new TwitchVideoPresenter(video).toHtml();
		})
		.join('');
	const postsMarkdown = posts
		.slice(0, 3)
		.map((post) => new BlogPostPresenter(post).toHtml())
		.join('');
	const repositoriesMarkdown = new GitHubRepositoriesPresenter(repositories).toMarkdown();

	fs.writeFileSync(
		`${__dirname}/../README.md`,
		readme
			.replace('{! twitch !}', htmlVideo)
			.replace('{! repos !}', repositoriesMarkdown)
			.replace('{! posts !}', postsMarkdown),
	);
};

updateTwitch();
