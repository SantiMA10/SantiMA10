import { GitHubDriver } from "../drivers/GitHubDriver";

export class GetTopRepositories {
    public constructor(private driver: GitHubDriver) {}

    public async execute() {
        return {data: await this.driver.getRepositories()};
    }
}