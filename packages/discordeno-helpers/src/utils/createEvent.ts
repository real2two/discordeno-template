import type { EventHandlers } from "@discordeno/bot";
import type { ExtendedClient } from "../types";

export function createEvent<K extends keyof EventHandlers>(
  name: K,
  execute: (client: ExtendedClient) => EventHandlers[K],
) {
  return {
    name,
    execute,
  };
}