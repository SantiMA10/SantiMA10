import * as Factory from "factory.ts";
import { date, internet, random } from "faker";
import { GetVideosResponse } from "../../../src/entities/twitch/GetVideosResponse";

export const GetVideosResponseBuilder = Factory.Sync.makeFactory<GetVideosResponse>(
  {
    id: random.alphaNumeric(),
    user_id: random.alphaNumeric(),
    user_name: internet.userName(),
    title: random.words(),
    description: random.words(),
    created_at: date.past().toString(),
    published_at: date.past().toString(),
    url: internet.url(),
    thumbnail_url: internet.url(),
    viewable: "public",
    view_count: random.number(),
    language: "es",
    type: "archive",
    duration: "1h20m1s",
  }
);
