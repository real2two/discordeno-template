import cluster from "cluster";
import env from "@/env";
import { cpus } from "os";

// Sets the worker file to worker.js

cluster.setupPrimary({
  exec: "src/http/listen.js",
});

// When the cluster crashes, it creates a new cluster.

cluster.on("exit", (worker) => {
  console.log(`#${worker.process.pid} The worker died.`);
  createCluster();
});

// Spawn in clusters.

const clusterCount = env.AppClusters || cpus().length;
for (let i = 0; i < clusterCount; i++) {
  createCluster();
}

function createCluster() {
  const worker = cluster.fork();
  console.log(`#${worker.process.pid} A worker has spawned.`);
}
