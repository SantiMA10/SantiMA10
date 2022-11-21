import { BlogPost } from '../entities/BlogPost/BlogPost';
import { BlogPostRepository } from '../entities/BlogPost/BlogPostRepository';

export class GetLastBlogPosts {
	public constructor(private blogPostRepository: BlogPostRepository) {}

	public async execute(): Promise<{ data: BlogPost[] }> {
		return { data: await this.blogPostRepository.findAll() };
	}
}
