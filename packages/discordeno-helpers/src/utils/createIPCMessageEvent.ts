import type { Bot } from "@discordeno/bot";

/**
 * Create an IPC message event
 * @returns The IPC message event
 */
export function createIPCMessageEvent<B extends Bot, I, J>() {
  return <K extends keyof I & keyof J>(
    name: K,
    execute: (
      client: B,
    ) => (data: {
      guildId?: string;
      data: I[K];
      reply: (data: J[K]) => void;
    }) => Promise<void>,
  ) => {
    return {
      name,
      execute,
    };
  };
}
