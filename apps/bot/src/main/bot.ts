import { client as unextendedClient } from "./client";
import { createExtendedClient } from "../utils/createExtendedClient";

// Create client
const client = createExtendedClient(unextendedClient);

// Added a "testing" cluster messaging system
// TODO: Move this somewhere else
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

// Start the client
client.start();

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});
