import { createEvent } from "../utils/createFunctions";

export default createEvent("ready", () => {
  return (payload) => {
    console.log(`[Shard ${payload.shardId}] The shard is ready`);
  };
});
