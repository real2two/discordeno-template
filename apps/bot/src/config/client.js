import env from "@/env";

import { getInfo } from "discord-hybrid-sharding";
import { createBot, Intents } from "@discordeno/bot";

import { getProxyCacheBot } from "../utils/getProxyCacheBot";

export const client = getProxyCacheBot(
  createBot({
    token: env.DiscordToken,
    intents: Intents.Guilds | Intents.GuildMessages,

    rest: {
      proxy: {
        baseUrl: env.RestProxyBaseUrl,
        authorization: env.RestProxyAuthorization,
        authorizationHeader: env.RestProxyAuthorizationHeader,
      },
    },

    // eslint-disable-next-line turbo/no-undeclared-env-vars
    gateway: ["worker", "process"].includes(process.env["CLUSTER_MANAGER_MODE"])
      ? {
          firstShardId: getInfo().FIRST_SHARD_ID,
          lastShardId: getInfo().LAST_SHARD_ID,
          totalShards: getInfo().TOTAL_SHARDS,
          token: env.DiscordToken,
          events: {},
        }
      : undefined,
  }),
);
