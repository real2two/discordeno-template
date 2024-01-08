import { client as unextendedClient } from "./client";
import { createExtendedClient } from "../utils/createExtendedClient";

// Create client
const client = createExtendedClient(unextendedClient);

// Start the client
client.start();

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});
