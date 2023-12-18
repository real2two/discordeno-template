import type { Interaction, MessageComponents } from "@discordeno/bot";

export interface ComponentCollectorMessage {
  id: string;
  channelId: string;
  components: MessageComponents;
}

export interface ComponentCollectorOptions {
  expiresIn?: number;
  events: {
    collect?: (interaction: Interaction) => void;
    end?: () => void;
  };
}
