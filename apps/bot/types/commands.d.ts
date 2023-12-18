import type { Bot } from "@discordeno/bot";
import type { BotWithProxyCache, ProxyCacheTypes } from "dd-cache-proxy";
import type {
  ComponentCollectors,
} from "@/discordeno-helpers";
import type {
  CommandExecution,
  InteractionExecution,
} from "@/discordeno-helpers/types";

export interface ExtendedClient
  extends BotWithProxyCache<ProxyCacheTypes<true>, Bot> {
  collectors: {
    components: ComponentCollectors;
  };
}

export interface ExtendedCommandExecution extends CommandExecution {
  client: ExtendedClient;
}

export interface ExtendedInteractionExecution extends InteractionExecution {
  client: ExtendedClient;
}
