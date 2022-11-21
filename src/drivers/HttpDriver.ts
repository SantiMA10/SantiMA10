export interface HttpDriver {
	get(url: string): Promise<string>;
}
