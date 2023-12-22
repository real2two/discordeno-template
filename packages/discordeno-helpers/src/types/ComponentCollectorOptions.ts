import type { Interaction } from "@discordeno/bot";

export interface ComponentCollectorOptions {
  expiresIn?: number;
  events: {
    collect?: (interaction: Interaction) => unknown;
    end?: () => unknown;
  };
}
