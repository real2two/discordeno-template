import type { Bot, EventHandlers } from "@discordeno/bot";

/**
 * Create the event handler
 * @returns The event handler
 */
export function createEventHandler<B extends Bot>() {
  return <K extends keyof EventHandlers>(
    name: K,
    execute: (client: B) => EventHandlers[K],
  ) => ({
    name,
    execute,
  });
}
