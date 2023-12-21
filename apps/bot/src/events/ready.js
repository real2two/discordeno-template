/** @param {import("@discordeno/bot").Bot} client */
export default () => ({
  /** @param {Parameters<import("@discordeno/bot").EventHandlers["ready"]>[0]} payload */
  execute: (payload) => {
    console.log(`[Shard ${payload.shardId}] The shard is ready`);
  },
});
