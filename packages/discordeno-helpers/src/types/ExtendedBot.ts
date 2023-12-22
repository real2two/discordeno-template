import type { Bot } from "@discordeno/bot";
import type { ClusterClient } from "discord-hybrid-sharding";
import type DiscordCrossHosting from "discord-cross-hosting";
import type { BotWithProxyCache, ProxyCacheTypes } from "dd-cache-proxy";
import type { ComponentCollectors } from "../structures/ComponentCollectors";

export interface ExtendedClient extends BotWithProxyCache<ProxyCacheTypes<true>, Bot> {
  cluster: ClusterClient<Bot>;
  machine: DiscordCrossHosting.Shard;
  collectors: {
    components: ComponentCollectors;
  };
}
