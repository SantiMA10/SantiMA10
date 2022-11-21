import { anyString, instance, mock, when } from 'ts-mockito';

import { HttpDriver } from '../../src/drivers/HttpDriver';
import { BlogPost } from '../../src/entities/BlogPost/BlogPost';
import { HttpBlogPostRepository } from '../../src/infrastructure/HttpBlogPostRepository';

const rss = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <id>https://santiagomartin.dev/</id>
    <title>/blog - Santiago Martín</title>
    <updated>2022-11-21T15:42:23.156Z</updated>
    <generator>https://github.com/SantiMA10/santiagomartin.dev</generator>
    <author>
        <name>Santiago Martín Agra</name>
        <email>web@santiagomartin.dev</email>
        <uri>https://santiagomartin.dev</uri>
    </author>
    <link rel="alternate" href="https://santiagomartin.dev/"/>
    <logo>https://santiagomartin.dev/favicon.ico</logo>
    <icon>https://santiagomartin.dev/favicon.ico</icon>
    <rights>All rights reserved 2022, Santiago Martin</rights>
    <entry>
        <title type="html"><![CDATA[GitLab/GitHub en el Stream Deck]]></title>
        <id>gitlab-github-en-el-stream-deck</id>
        <link href="https://santiagomartin.dev/blog/gitlab-github-en-el-stream-deck"/>
        <updated>2020-03-16T10:53:07.000Z</updated>
        <summary type="html"><![CDATA[Controla tus CI/CD desde tu StreamDeck]]></summary>
        <author>
            <name>Santiago Martín Agra</name>
            <email>web@santiagomartin.dev</email>
            <uri>https://santiagomartin.dev</uri>
        </author>
    </entry>
</feed>`;

describe('HttpBlogPostRepository', () => {
	describe('#findAll', () => {
		it('return the list of BlogPosts', async () => {
			const driver = mock<HttpDriver>();
			when(driver.get(anyString())).thenResolve(rss);
			const subject = new HttpBlogPostRepository(instance(driver));

			const blogPosts = await subject.findAll();

			expect(blogPosts).toStrictEqual([
				new BlogPost(
					'gitlab-github-en-el-stream-deck',
					'GitLab/GitHub en el Stream Deck',
					new Date('2020-03-16T10:53:07.000Z'),
				),
			]);
		});
	});
});
