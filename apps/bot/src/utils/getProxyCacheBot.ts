import { createProxyCache } from "dd-cache-proxy";
import type { Bot } from "@discordeno/bot";

/**
 * Add the cache proxy to the Discordeno bot
 * @param bot The Discordeno bot
 * @returns The client with the cache proxy (client.cache)
 */
export function getProxyCacheBot<B extends Bot>(bot: B) {
  return createProxyCache(bot, {
    desiredProps: {
      guilds: ["channels", "icon", "id", "name", "roles", "ownerId"],
      users: ["avatar", "id", "username"],
    },
    cacheInMemory: {
      users: true,
      members: true,
      roles: true,
      guilds: true,
      channels: true,
      default: false,
    },
    cacheOutsideMemory: {
      default: false,
    },
  });
}
