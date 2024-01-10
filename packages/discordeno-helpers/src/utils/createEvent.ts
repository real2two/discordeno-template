import type { EventHandlers } from "@discordeno/bot";
import type { ExtendedBot } from "../types";

export function createEventHandler<B extends ExtendedBot>() {
  return <K extends keyof EventHandlers>(
    name: K,
    execute: (client: B) => EventHandlers[K],
  ) => ({
    name,
    execute,
  });
}
