import { ClusterClient } from "discord-hybrid-sharding";
import { createProxyCache } from "dd-cache-proxy";

import { Shard } from "@/discord-cross-hosting";
import { ComponentCollectors } from "@/discordeno-helpers";

import { client } from "../config/client.js";
import { events } from "../config/events.js";

import { addDesiredProperties } from "../utils/addDesiredProperties.js";

client.cluster = new ClusterClient(client);
client.machine = new Shard(client.cluster);

client.collectors = {
  components: new ComponentCollectors(client),
};

client.events = events;

addDesiredProperties(client);

client.cluster.on("message", (message) => {
  // This is some kind of IPC-like system for cross hosting.
  // You can remove this event handler if you aren't going to use the web process.
  if (!message.guildId) return;
  message.reply({
    data: {
      guildId: message.guildId,
      // cool: "response", // You can use this to communicate with the web process.
    },
  });
});

process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});

client.start();
