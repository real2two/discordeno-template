import { client as unextendedClient } from "./client";

import { events } from "../loaders/events";
import { ipcs } from "../loaders/ipcs";

import { createExtendedBot } from "../utils/createExtendedBot";
import { addIPCMessageHandler } from "@/discordeno-helpers";

// Create client
const client = createExtendedBot(unextendedClient);

// Event handler
for (const event of events) {
  client.events[event.name] = event.execute(client) as (...args: any[]) => void;
}

// IPC message handler
addIPCMessageHandler(client, ipcs);

// Start the client
client.start();

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});
