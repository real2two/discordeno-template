import env from "@/env";
import DiscordCrossHosting from "discord-cross-hosting";
import {
  ClusterManager,
  ReClusterManager,
  HeartbeatManager,
} from "discord-hybrid-sharding";
import { fileURLToPath } from "url";

// Connect to bridge
const client = new DiscordCrossHosting.Client({
  agent: "bot",
  host: env.BridgeHost,
  port: env.BridgePort,
  authToken: env.BridgeAuthToken,
  rollingRestarts: false,
});
client.on("debug", console.log);
client.connect();

// Creates a shard manager.
const manager = new ClusterManager(`${__dirname}/worker.ts`, {
  totalShards: env.BridgeTotalShards,
  shardsPerClusters: env.BridgeShardsPerCluster,
  restarts: {
    max: 10,
    interval: 3600000,
  },
  execArgv: process.execArgv.concat(process.argv.slice(2)),
});

manager.extend(new ReClusterManager());
manager.extend(
  new HeartbeatManager({
    interval: 2000,
    maxMissedHeartbeats: 5,
  }),
);

/* manager.on("clusterCreate", (cluster) =>
  console.log(`Launched cluster ${cluster.id}`),
); */
manager.on("debug", console.log);

// Listen to bridge client

requestShardData();

function requestShardData() {
  client
    .requestShardData()
    .then((e) => {
      if (!e) return;
      if (!e.shardList) return;
      manager.totalShards = e.totalShards;
      manager.totalClusters = e.shardList.length;
      // @ts-ignore
      manager.shardList = e.shardList;
      manager.clusterList = e.clusterList;
      manager.spawn({ timeout: -1 });
    })
    .catch((e) => {
      console.error(e);
      requestShardData();
    });
}

client.listen(manager);
