import env from "@/env";

import { getInfo } from "discord-hybrid-sharding";
import { createBot, Intents } from "@discordeno/bot";

export const client = createBot({
  token: env.DiscordToken as string,
  intents: Intents.Guilds | Intents.GuildMessages,
  events: {},

  rest: {
    proxy: {
      baseUrl: env.RestProxyBaseUrl,
      authorization: env.RestProxyAuthorization!,
      authorizationHeader: env.RestProxyAuthorizationHeader,
    },
  },

  gateway: ["worker", "process"].includes(
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env["CLUSTER_MANAGER_MODE"]!,
  )
    ? {
        firstShardId: getInfo().FIRST_SHARD_ID,
        lastShardId: getInfo().LAST_SHARD_ID,
        totalShards: getInfo().TOTAL_SHARDS,
        token: env.DiscordToken as string,
        events: {},
      }
    : undefined,
});
