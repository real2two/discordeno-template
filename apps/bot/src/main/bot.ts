import DiscordCrossHosting from "discord-cross-hosting";
import { ClusterClient } from "discord-hybrid-sharding";

import { ComponentCollectors, type ExtendedClient } from "@/discordeno-helpers";

import { client as rawClient } from "../config/client";
import { events } from "../config/events";

import { addDesiredProperties } from "../utils/addDesiredProperties";

const client = rawClient as ExtendedClient;

client.collectors = {
  components: new ComponentCollectors(client),
};

for (const [eventName, createEvent] of Object.entries(events)) {
  // @ts-ignore
  client.events[eventName] = createEvent(client)?.execute;
}

client.cluster = new ClusterClient(client);
client.machine = new DiscordCrossHosting.Shard(client.cluster);

addDesiredProperties(client);

/* TODO: Move this somewhere else */
client.cluster.on("message", (message) => {
  // This is some kind of IPC-like system for cross hosting.
  // You can remove this event handler if you aren't going to use the web process.

  // @ts-ignore
  const guildId = message.guildId as string;
  if (!guildId) return;

   // @ts-ignore
  message.reply({
    data: {
      guildId,
      // cool: "response", // You can use this to communicate with the web process.
    },
  });
});

client.start();
