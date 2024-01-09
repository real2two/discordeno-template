import type { ExtendedBot } from "../types";

export function getIPCMessageEvent<I, J>() {
  return <K extends keyof I & keyof J>(
    name: K,
    execute: (
      client: ExtendedBot,
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
