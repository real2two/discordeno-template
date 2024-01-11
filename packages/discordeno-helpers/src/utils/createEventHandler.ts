import type { EventHandlers } from "@discordeno/bot";
import type { ExtendedBot } from "../types";

/**
 * Create the event handler
 * @returns The event handler
 */
export function createEventHandler<B extends ExtendedBot>() {
  return <K extends keyof EventHandlers>(
    name: K,
    execute: (client: B) => EventHandlers[K],
  ) => ({
    name,
    execute,
  });
}
