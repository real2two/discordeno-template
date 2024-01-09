import type { Client } from "discord-cross-hosting";

export class IPCMessageClient<I, J> {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async send<K extends keyof I & keyof J>(
    event: K,
    data: I[K],
    opts?: { guildId?: string },
  ) {
    let response;
    if (opts?.guildId) {
      response = await this.client.requestToGuild({
        event,
        guildId: opts.guildId,
        data,
      });
    } else {
      response = await this.client.send({
        event,
        data,
      });
    }

    // This error is "normal" when starting up.
    // I added a "success" variable, because discord-cross-hosting sometimes
    // responds with the given request for some reason I don't know.
    if (!response.success) throw new Error("Unsuccessfully sent response.");

    return response.data;
  }
}
