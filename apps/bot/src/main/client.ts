import { addIPCMessageHandler } from "@/discordeno-helpers";

import { events } from "../loaders/events";
import { ipcs } from "../loaders/ipcs";

import { getProxyCacheBot } from "../utils/getProxyCacheBot";
import { createClusteredBot } from "@/discordeno-helpers";

import { addDesiredProperties } from "../utils/addDesiredProperties";

import { bot } from "./bot";

// Create client
export const client = getProxyCacheBot(createClusteredBot(bot));

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
