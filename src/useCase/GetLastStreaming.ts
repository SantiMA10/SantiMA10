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
      data: data.map((video) => ({
        url: video.url,
        title: video.title,
        thumbnail_url: video.thumbnail_url,
      })),
    };
  }
}
