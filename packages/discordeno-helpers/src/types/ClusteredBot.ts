import type { Bot } from "@discordeno/bot";

import DiscordCrossHosting from "discord-cross-hosting";
import { ClusterClient } from "discord-hybrid-sharding";

export type ClusteredBot<B extends Bot = Bot> = B & {
  cluster: ClusterClient<Bot>;
  machine: DiscordCrossHosting.Shard;
};
