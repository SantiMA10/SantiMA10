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

    it("fixes the url for the thumbnail", async () => {
      const videoResponse = GetVideosResponseBuilder.build({
        thumbnail_url:
          "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/c8e10146f70c53ab65fe_santima10_40161155900_1606579448//thumb/thumb0-%{width}x%{height}.jpg",
      });
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
            thumbnail_url:
              "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/c8e10146f70c53ab65fe_santima10_40161155900_1606579448/thumb/thumb0-320x180.jpg",
          },
        ])
      );
    });
  });
});
