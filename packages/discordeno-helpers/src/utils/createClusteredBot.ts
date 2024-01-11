import DiscordCrossHosting from "discord-cross-hosting";
import { ClusterClient } from "discord-hybrid-sharding";

import type { Bot } from "@discordeno/bot";
import type { ClusteredBot } from "../types/ClusteredBot";

/**
 * Add the cluster and machine properties on the client
 * @param bot The bot
 * @returns The transformed bot
 */
export function createClusteredBot<B extends Bot = Bot>(bot: B) {
  const client = bot as ClusteredBot<B>;

  // Added cluster and machine
  client.cluster = new ClusterClient(client);
  client.machine = new DiscordCrossHosting.Shard(client.cluster);

  return client;
}
