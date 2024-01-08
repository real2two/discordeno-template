import { createEvent } from "@/discordeno-helpers";

export default createEvent("ready", () => {
  return (payload) => {
    console.log(`[Shard ${payload.shardId}] The shard is ready`);
  };
});
