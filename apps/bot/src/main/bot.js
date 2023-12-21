import DiscordCrossHosting from "discord-cross-hosting";
import { ClusterClient } from "discord-hybrid-sharding";

import { ComponentCollectors } from "@/discordeno-helpers";

import { client } from "../config/client.ts";
import { events } from "../config/events.ts";

import { addDesiredProperties } from "../utils/addDesiredProperties.ts";

client.collectors = {
  components: new ComponentCollectors(client),
};

for (const [eventName, createEvent] of Object.entries(events)) {
  client.events[eventName] = createEvent(client)?.execute;
}

client.cluster = new ClusterClient(client);
client.machine = new DiscordCrossHosting.Shard(client.cluster);

addDesiredProperties(client);

/* TODO: Move this somewhere else */
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

client.start();
