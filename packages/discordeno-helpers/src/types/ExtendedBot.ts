// This is BAD CODE, because I want to keep packages indepdent from each other.

// I defined these variables on apps/bot, and not discordeno-helpers.

// You can't just remove this file, since many files use the type ExtendedBot.
// It's easier to make it like this, than to use generics.

// This should be fine for now, because this library is exlusively for the bot template.

import type { Bot } from "@discordeno/bot";
import type { ClusterClient } from "discord-hybrid-sharding";
import type DiscordCrossHosting from "discord-cross-hosting";
import type { BotWithProxyCache, ProxyCacheTypes } from "dd-cache-proxy";
import type { ComponentCollectors } from "../structures/ComponentCollectors";

export interface ExtendedClient
  extends BotWithProxyCache<ProxyCacheTypes<true>, Bot> {
  cluster: ClusterClient<Bot>;
  machine: DiscordCrossHosting.Shard;
  collectors: {
    components: ComponentCollectors;
  };
}
