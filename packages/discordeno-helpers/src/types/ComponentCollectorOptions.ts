import type { Interaction } from "@discordeno/bot";

export interface ComponentCollectorOptions {
  expiresIn?: number;
  events: {
    collect?: (interaction: Interaction) => void;
    end?: () => void;
  };
}
