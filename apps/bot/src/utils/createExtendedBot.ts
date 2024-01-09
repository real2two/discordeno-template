import DiscordCrossHosting from "discord-cross-hosting";
import { ClusterClient } from "discord-hybrid-sharding";

import { ComponentCollectors, type ExtendedBot } from "@/discordeno-helpers";

import { getProxyCacheBot } from "./getProxyCacheBot";
import { addDesiredProperties } from "./addDesiredProperties";

import type { Bot } from "@discordeno/bot";

/**
 * Extends the Discordeno client
 * @param unextendedClient The unextended bot client from discordeno
 * @returns The extended client
 */
export function createExtendedBot(unextendedClient: Bot) {
  const client = getProxyCacheBot(unextendedClient) as ExtendedBot;

  client.collectors = {
    components: new ComponentCollectors(client),
  };

  client.cluster = new ClusterClient(client);
  client.machine = new DiscordCrossHosting.Shard(client.cluster);

  addDesiredProperties(client);

  return client;
}
