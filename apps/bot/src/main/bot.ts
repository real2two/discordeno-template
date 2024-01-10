import { addIPCMessageHandler } from "@/discordeno-helpers";

import { events } from "../loaders/events";
import { ipcs } from "../loaders/ipcs";

import { getProxyCacheBot } from "../utils/getProxyCacheBot";
import { createClusteredBot } from "@/discordeno-helpers";
import { createExtendedBot } from "@/discordeno-helpers";

import { addDesiredProperties } from "../utils/addDesiredProperties";

import { client as unextendedClient } from "./client";

// Create client
export const client = getProxyCacheBot(
  createExtendedBot(createClusteredBot(unextendedClient)),
);

// Adding additional utilities to the client
addDesiredProperties(client);
addIPCMessageHandler(client, ipcs);

// Event handler
for (const event of events) {
  client.events[event.name] = event.execute(client) as (...args: any[]) => void;
}

// Start the client
client.start();

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});
