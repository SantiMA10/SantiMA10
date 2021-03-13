import { GitHubDriver } from "../../src/drivers/GitHubDriver"
import { GetTopRepositories } from "../../src/useCase/GetTopRepositories"

describe("GetTopRepositories", () => {
    describe("#execute", () => {
        it("returns my top repositories", async () => {
            const fakeDriver = {
                getRepositories: async () => [{
                    "name": "devops-streamdeck",
                    "stargazerCount": 35,
                    "url": "https://github.com/SantiMA10/devops-streamdeck"
                  }]
            }
            const subject = new GetTopRepositories(fakeDriver as GitHubDriver);

            const {data} = await subject.execute();

            expect(data).toEqual([{
                "name": "devops-streamdeck",
                "stargazerCount": 35,
                "url": "https://github.com/SantiMA10/devops-streamdeck"
              }])

        })
    })
})