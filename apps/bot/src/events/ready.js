/**
 *
 * @param {Parameters<import("@discordeno/bot").EventHandlers["ready"]>[0]} payload
 */
export async function ready(payload) {
  console.log(`[Shard ${payload.shardId}] The shard is ready`);
}