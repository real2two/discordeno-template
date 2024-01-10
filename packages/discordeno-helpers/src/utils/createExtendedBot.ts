import { ComponentCollectors } from "../structures";

import type { Bot } from "@discordeno/bot";
import type { ExtendedBot } from "../types";

export function createExtendedBot<B extends Bot = Bot>(rawClient: B) {
  const client = rawClient as ExtendedBot<B>;

  client.collectors = {
    components: new ComponentCollectors(client),
  };

  return client;
}
