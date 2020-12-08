import * as Factory from "factory.ts";
import { date, internet, random } from "faker";
import { TwitchVideo } from "../../src/entities/TwitchVideo";

export const TwitchVideoBuilder = Factory.Sync.makeFactory<TwitchVideo>({
  title: random.words(),
  url: internet.url(),
  thumbnail_url: internet.url(),
});
