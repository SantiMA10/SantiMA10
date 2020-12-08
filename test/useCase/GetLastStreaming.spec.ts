import { TwitchDriver } from "../../src/drivers/TwitchDriver";
import { GetLastStreaming } from "../../src/useCase/GetLastStreaming";
import { GetVideosResponseBuilder } from "../builders/twitch/GetVideosResponseBuilder";

describe("GetLastStreaming", () => {
  describe("#execute", () => {
    it("returns a list of TwitchVideos", async () => {
      const videoResponse = GetVideosResponseBuilder.build();
      const twitchDriver = ({
        post: jest.fn(async () => ({ data: [videoResponse] })),
      } as unknown) as TwitchDriver;
      const subject = new GetLastStreaming(twitchDriver);

      const { data } = await subject.execute({ userId: "userId" });

      expect(data).toEqual(
        expect.arrayContaining([
          {
            title: videoResponse.title,
            url: videoResponse.url,
            thumbnail_url: videoResponse.thumbnail_url,
          },
        ])
      );
    });
  });
});
