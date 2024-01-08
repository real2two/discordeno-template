import { client as unextendedClient } from "./client";
import { createExtendedClient } from "../utils/createExtendedClient";

const client = createExtendedClient(unextendedClient);

/* TODO: Move this somewhere else */
client.cluster.on("message", (message) => {
  // This is some kind of IPC-like system for cross hosting.
  // You can remove this event handler if you aren't going to use the web process.

  if (typeof message !== "object" || "guildId" in message === false) return;

  const guildId = message.guildId as string;
  if (!guildId) return;

  message.reply({
    data: {
      guildId,
      // cool: "response", // You can use this to communicate with the web process.
    },
  });
});

client.start();
