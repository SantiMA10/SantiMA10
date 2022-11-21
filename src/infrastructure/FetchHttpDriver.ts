import fetch from 'node-fetch';

export class FetchHttpDriver {
	public async get(url: string): Promise<string> {
		const response = await fetch(url, {
			method: 'GET',
		});

		return response.text();
	}
}
