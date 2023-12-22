import type { EventHandlers } from "@discordeno/bot";

export default () => ({
  execute: (payload: Parameters<EventHandlers["ready"]>[0]) => {
    console.log(`[Shard ${payload.shardId}] The shard is ready`);
  },
});
