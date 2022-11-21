import { BlogPost } from '../entities/BlogPost/BlogPost';

export class BlogPostPresenter {
	public constructor(private post: BlogPost) {}

	public toHtml(): string {
		return `<a href='${this.post.url}' target='_blank'>
<img width='30%' src='${this.post.thumbnail}' alt='${this.post.title}' />
</a>`;
	}
}
