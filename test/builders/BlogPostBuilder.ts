import { date, random } from 'faker';

import { BlogPost } from '../../src/entities/BlogPost/BlogPost';

export class BlogPostBuilder {
	static build(): BlogPost {
		return new BlogPost(random.word(), random.word(), date.past());
	}
}
