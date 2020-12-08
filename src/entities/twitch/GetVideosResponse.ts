export interface GetVideosResponse {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: "public";
  view_count: number;
  language: "es";
  type: "archive";
  duration: string;
}
