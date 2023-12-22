import type { Bot } from "@discordeno/bot";
import type { BotWithProxyCache, ProxyCacheTypes } from "dd-cache-proxy";
import type { ComponentCollectors } from "../structures/ComponentCollectors";

export interface ExtendedClient
  extends BotWithProxyCache<ProxyCacheTypes<true>, Bot> {
  collectors: {
    components: ComponentCollectors;
  };
}
