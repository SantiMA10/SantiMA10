import { TwitchVideo } from "../entities/TwitchVideo";

export class TwitchVideoPresenter {
  public constructor(private video: TwitchVideo) {}

  public toHtml(): string {
    return `<a href='${this.video.url}' target='_blank'>
<img width='30%' src='${this.video.thumbnail_url}' alt='${this.video.title}' />
</a>`;
  }
}
