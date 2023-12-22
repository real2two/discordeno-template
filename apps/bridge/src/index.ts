import env from "@/env";
import DiscordCrossHosting from "discord-cross-hosting";

(async () => {
  const server = new DiscordCrossHosting.Bridge({
    port: env.BridgePort,
    authToken: env.BridgeAuthToken,
    totalShards: env.BridgeTotalShards,
    totalMachines: env.BridgeTotalMachines,
    shardsPerCluster: env.BridgeShardsPerCluster,
    token: env.DiscordToken as string,
  });

  server.on("debug", console.log);

  server.on("ready", (url) => {
    console.log(`Server is ready ${url}`);
  });

  process.on("uncaughtException", (err) => {
    console.error(err);
  });

  process.on("unhandledRejection", (err) => {
    console.error(err);
  });

  await server.start();
})();
