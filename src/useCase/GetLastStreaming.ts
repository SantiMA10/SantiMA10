import { TwitchDriver } from "../drivers/TwitchDriver";
import { GetVideosResponse } from "../entities/twitch/GetVideosResponse";
import { TwitchVideo } from "../entities/TwitchVideo";

type Response = {
  data: TwitchVideo[];
};

export class GetLastStreaming {
  public constructor(private twitchDriver: TwitchDriver) {}

  public async execute({ userId }: { userId: string }): Promise<Response> {
    const { data } = await this.twitchDriver.post<GetVideosResponse[]>(
      `helix/videos?user_id=${userId}`
    );

    return {
      data: data
        .filter((video) => !!video.thumbnail_url)
        .map((video) => {
          const thumbnail = video.thumbnail_url
            .replace("//thumb", "/thumb")
            .replace("%{height}", "180")
            .replace("%{width}", "320");

          return {
            url: video.url,
            title: video.title,
            thumbnail_url: thumbnail,
          };
        }),
    };
  }
}
