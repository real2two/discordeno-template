import DiscordCrossHosting from "discord-cross-hosting";
import { ClusterClient } from "discord-hybrid-sharding";

import { events } from "../handlers/events";

import { getProxyCacheBot } from "../utils/getProxyCacheBot";
import { addDesiredProperties } from "../utils/addDesiredProperties";

import { ComponentCollectors, type ExtendedClient } from "@/discordeno-helpers";

import type { Bot } from "@discordeno/bot";

/**
 * Extends the Discordeno client
 * @param unextendedClient The unextended bot client from discordeno
 * @returns The extended client
 */
export function createExtendedClient(unextendedClient: Bot) {
  const client = getProxyCacheBot(unextendedClient) as ExtendedClient;

  client.collectors = {
    components: new ComponentCollectors(client),
  };
  
  for (const event of events) {
    client.events[event.name] = event.execute(client) as (
      ...args: any[]
    ) => unknown;
  }
  
  client.cluster = new ClusterClient(client);
  client.machine = new DiscordCrossHosting.Shard(client.cluster);
  
  addDesiredProperties(client);

  return client;
}
