import { TwitchDriver } from './drivers/TwitchDriver';
import { GetLastStreaming } from './useCase/GetLastStreaming';
import fs from 'fs';
import { TwitchVideoPresenter } from './presenters/TwitchVideoPresenter';
import { GitHubDriver } from './drivers/GitHubDriver';
import { GetTopRepositories } from './useCase/GetTopRepositories';
import { GitHubRepositoriesPresenter } from './presenters/GitHubRepositoriesPresenter';

const updateTwitch = async () => {
	const twitchDriver = new TwitchDriver({
		clientId: process.env.TWITCH_CLIENT_ID || '',
		clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
	});
	const { data } = await new GetLastStreaming(twitchDriver).execute({
		userId: process.env.TWITCH_USER_ID || '',
	});

	const readme = fs.readFileSync(`${__dirname}/README.base.md`).toString();

	const htmlVideo = data
		.slice(0, 3)
		.map((video) => {
			return new TwitchVideoPresenter(video).toHtml();
		})
		.join('');

	const gitHubDriver = new GitHubDriver({
		token: process.env.GITHUB_TOKEN || '',
	});
	const { data: repositories } = await new GetTopRepositories(gitHubDriver).execute();
	const repositoriesMarkdown = new GitHubRepositoriesPresenter(repositories).toMarkdown();

	fs.writeFileSync(
		`${__dirname}/../README.md`,
		readme.replace('{! twitch !}', htmlVideo).replace('{! repos !}', repositoriesMarkdown),
	);
};

updateTwitch();
