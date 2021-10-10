import nock from 'nock';

import { TwitchDriver } from '../../src/drivers/TwitchDriver';
import { GetVideosResponse } from '../../src/entities/twitch/GetVideosResponse';
import { GetVideosResponseBuilder } from '../builders/twitch/GetVideosResponseBuilder';

const mockCredentialRequest = () => {
	return nock('https://id.twitch.tv')
		.post(
			'/oauth2/token?client_id=client-id&client_secret=client-secret&grant_type=client_credentials',
		)
		.reply(200, {
			access_token: 'some-token',
			expires_in: 4832983,
			token_type: 'bearer',
		});
};

const mockVideoRequest = () => {
	return nock('https://api.twitch.tv', {
		reqheaders: {
			'Client-ID': 'client-id',
			'Authorization': 'Bearer some-token',
			'Content-Type': 'application/json',
		},
	})
		.get('/helix/videos?user_id=userId')
		.reply(200, {
			data: [GetVideosResponseBuilder.build()],
		});
};

describe('TwitchDriver', () => {
	describe('#post', () => {
		it('get credentials from twitch', async () => {
			const scope = mockCredentialRequest();
			mockVideoRequest();
			const subject = new TwitchDriver({
				clientId: 'client-id',
				clientSecret: 'client-secret',
			});

			await subject.post('helix/videos?user_id=userId');

			expect(scope.isDone()).toBe(true);
		});

		it('get videos from twitch', async () => {
			mockCredentialRequest();
			mockVideoRequest();
			const subject = new TwitchDriver({
				clientId: 'client-id',
				clientSecret: 'client-secret',
			});

			const { data } = await subject.post<GetVideosResponse[]>('helix/videos?user_id=userId');

			expect(data).toHaveLength(1);
		});
	});
});
