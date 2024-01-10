import DiscordCrossHosting from "discord-cross-hosting";
import { ClusterClient } from "discord-hybrid-sharding";

import type { Bot } from "@discordeno/bot";
import type { ClusteredBot } from "../types/ClusteredBot";

export function createClusteredBot<B extends Bot = Bot>(rawClient: B) {
  const client = rawClient as ClusteredBot<B>;

  // Added cluster and machine
  client.cluster = new ClusterClient(client);
  client.machine = new DiscordCrossHosting.Shard(client.cluster);

  return client;
}
