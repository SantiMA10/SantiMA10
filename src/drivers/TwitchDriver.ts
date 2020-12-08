import fetch from "node-fetch";

export class TwitchDriver {
  public constructor(
    private configuration: { clientId: string; clientSecret: string }
  ) {}

  public async post<Response>(path: string): Promise<{ data: Response }> {
    const { clientId, clientSecret } = this.configuration;
    const authResponse = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: "POST" }
    );

    const { access_token } = await authResponse.json();

    const response = await fetch(`https://api.twitch.tv/${path}`, {
      method: "GET",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }
}
