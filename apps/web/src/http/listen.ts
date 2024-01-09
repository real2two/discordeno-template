import env from "@/env";
import express from "express";
import DiscordCrossHosting from "discord-cross-hosting";

import { getIPCMessageClient } from "@/ipc";

// Connect to bridge

const client = new DiscordCrossHosting.Client({
  agent: "dashboard",
  host: env.BridgeHost,
  port: env.BridgePort,
  authToken: env.BridgeAuthToken,
});

client.on("debug", console.log);
client.connect();
client.on("ready", () => {
  console.log("Client is ready");
});

// Typed IPC for client

const ipcMessageClient = getIPCMessageClient(client);

// Start web server

export const app = express();

app.get("/guild/:id", async (req, res) => {
  const guildId = req.params.id;
  try {
    const e = await ipcMessageClient.send(
      "getGuild",
      {
        someCustomVariable: "Hello world!",
      },
      { guildId },
    );
    res.send(e);
  } catch (err) {
    console.error(err);
    res.send("An unexpected error has occurred");
  }
});

app.listen(env.AppPort);
