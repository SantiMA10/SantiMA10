export class BlogPost {
	public constructor(public slug: string, public title: string, public date: Date) {}

	public get url(): string {
		return `https://santiagomartin.dev/blog/${this.slug}`;
	}

	public get thumbnail(): string {
		return `https://santiagomartin.dev/api/og?title=${this.title}`;
	}
}
