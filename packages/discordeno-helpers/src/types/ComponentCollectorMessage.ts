import type { Component } from "@discordeno/bot";

export interface ComponentCollectorMessage {
  id: bigint | string;
  channelId: bigint | string;
  components: Component[];
}
