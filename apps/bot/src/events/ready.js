/**
 *
 * @param {Parameters<import("@discordeno/bot").EventHandlers["ready"]>[0]} payload
 */
export default async (payload) => {
  console.log(`[Shard ${payload.shardId}] The shard is ready`);
};
