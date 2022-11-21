import { instance, mock, when } from 'ts-mockito';

import { BlogPostRepository } from '../../src/entities/BlogPost/BlogPostRepository';
import { GetLastBlogPosts } from '../../src/useCase/GetLastBlogPosts';
import { BlogPostBuilder } from '../builders/BlogPostBuilder';

describe('GetLastBlogPosts', () => {
	describe('#execute', () => {
		it('returns a list of posts', async () => {
			const blogPost = BlogPostBuilder.build();
			const repository = mock<BlogPostRepository>();
			when(repository.findAll()).thenResolve([blogPost]);
			const subject = new GetLastBlogPosts(instance(repository));

			const { data } = await subject.execute();

			expect(data).toEqual(
				expect.arrayContaining([
					{
						slug: blogPost.slug,
						title: blogPost.title,
						date: blogPost.date,
					},
				]),
			);
		});
	});
});
