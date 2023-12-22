import { createProxyCache } from "dd-cache-proxy";
import type { Bot } from "@discordeno/bot";

export function getProxyCacheBot(bot: Bot) {
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
