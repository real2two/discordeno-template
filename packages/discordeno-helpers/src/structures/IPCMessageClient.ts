import type { Client } from "discord-cross-hosting";

export class IPCMessageClient<I, J> {
  client: Client;

  /**
   * Create the IPC message client
   * @param client The client
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Send an IPC message client message
   * @param event The IPC message handler event name
   * @param data The data
   * @param opts The options
   */
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
