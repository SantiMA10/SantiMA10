import nock from "nock";
import { GitHubDriver } from "../../src/drivers/GitHubDriver";

describe("GitHubDriver", () => {
    describe("#getRepositories", () => {
        it("returns the list of repositories with more stargazer", async () => {
            nock('https://api.github.com').post('/graphql').reply(200, {
                "data": {
                  "repositoryOwner": {
                    "repositories": {
                      "nodes": [
                        {
                          "name": "tailwindcss-parcel-starter",
                          "stargazerCount": 42,
                          "url": "https://github.com/SantiMA10/tailwindcss-parcel-starter"
                        },
                        {
                          "name": "devops-streamdeck",
                          "stargazerCount": 35,
                          "url": "https://github.com/SantiMA10/devops-streamdeck"
                        },
                        {
                          "name": "lights",
                          "stargazerCount": 7,
                          "url": "https://github.com/streamdevs/lights"
                        }
                      ]
                    }
                  }
                }
              })
            const subject = new GitHubDriver({ token: "token" });

            const repositories = await subject.getRepositories();

            expect(repositories).toEqual([
                {
                  "name": "tailwindcss-parcel-starter",
                  "stargazerCount": 42,
                  "url": "https://github.com/SantiMA10/tailwindcss-parcel-starter"
                },
                {
                  "name": "devops-streamdeck",
                  "stargazerCount": 35,
                  "url": "https://github.com/SantiMA10/devops-streamdeck"
                },
                {
                  "name": "lights",
                  "stargazerCount": 7,
                  "url": "https://github.com/streamdevs/lights"
                }
              ])
        })

        it("returns an empty list if something goes wrong with the request", async () => {
            nock('https://api.github.com').post('/graphql').reply(400, 'error')
            const subject = new GitHubDriver({ token: "token" });

            const repositories = await subject.getRepositories();

            expect(repositories).toBeEmpty();
        })
    })
})