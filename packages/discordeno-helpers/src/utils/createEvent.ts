import type { EventHandlers } from "@discordeno/bot";
import type { ExtendedBot } from "../types";

export function createEvent<K extends keyof EventHandlers>(
  name: K,
  execute: (client: ExtendedBot) => EventHandlers[K],
) {
  return {
    name,
    execute,
  };
}
