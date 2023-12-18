import env from "@/env";
import express from "express";
import { Client } from "@/discord-cross-hosting";

// Connect to bridge

const client = new Client({
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

// Start web server

export const app = express();

app.get("/guild/:id", async (req, res) => {
  const guildId = req.params.id;
  try {
    const e = await client.requestToGuild({ guildId: guildId });
    if (!e.data) throw new Error("No response provided");
    res.send(e);
  } catch (err) {
    console.error(err);
    res.send("An unexpected error has occurred");
  }
});

app.listen(env.AppPort);
