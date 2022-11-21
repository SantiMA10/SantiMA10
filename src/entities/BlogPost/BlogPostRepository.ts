import { BlogPost } from './BlogPost';

export interface BlogPostRepository {
	findAll(): Promise<BlogPost[]>;
}
