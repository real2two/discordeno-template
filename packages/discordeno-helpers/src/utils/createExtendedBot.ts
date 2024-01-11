import { ComponentCollectors } from "../structures";

import type { Bot } from "@discordeno/bot";
import type { ExtendedBot } from "../types";

/**
 * Add collections on the client
 * @param bot The bot
 * @returns The transformed bot
 */
export function createExtendedBot<B extends Bot = Bot>(bot: B) {
  const client = bot as ExtendedBot<B>;

  client.collectors = {
    components: new ComponentCollectors(client),
  };

  return client;
}
