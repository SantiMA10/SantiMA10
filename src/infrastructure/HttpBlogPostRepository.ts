import Parser from 'rss-parser';

import { HttpDriver } from '../drivers/HttpDriver';
import { BlogPost } from '../entities/BlogPost/BlogPost';
import { BlogPostRepository } from '../entities/BlogPost/BlogPostRepository';

export class HttpBlogPostRepository implements BlogPostRepository {
	public constructor(private driver: HttpDriver) {}

	public async findAll(): Promise<BlogPost[]> {
		const data = await this.driver.get('https://santiagomartin.dev/rss.xml');
		const rss = await new Parser().parseString(data);

		return rss.items.map((item) => {
			return new BlogPost(
				item.id || '',
				item.title || '',
				item.pubDate ? new Date(item.pubDate) : new Date(),
			);
		});
	}
}
