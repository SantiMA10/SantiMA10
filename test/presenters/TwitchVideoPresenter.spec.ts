import { TwitchVideoPresenter } from '../../src/presenters/TwitchVideoPresenter';
import { TwitchVideoBuilder } from '../builders/TwitchVideoBuilder';

describe('TwitchVideoPresenter', () => {
	describe('#toHtml', () => {
		it('transforms the video into html', async () => {
			const video = TwitchVideoBuilder.build();
			const subject = new TwitchVideoPresenter(video);

			const html = subject.toHtml();

			expect(html).toEqual(
				expect.stringContaining(`<a href='${video.url}' target='_blank'>
<img width='30%' src='${video.thumbnail_url}' alt='${video.title}' />
</a>`),
			);
		});
	});
});
