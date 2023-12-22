export default {
  AppClusters: parseInt(process.env["APP_CLUSTERS"]!) ?? 0,
  AppPort: parseInt(process.env["APP_PORT"]!) ?? 3000,

  DatabaseHost: process.env["DATABASE_HOST"],
  DatabasePort: parseInt(process.env["DATABASE_PORT"]!) ?? 3306,
  DatabaseUser: process.env["DATABASE_USER"],
  DatabasePassword: process.env["DATABASE_PASSWORD"],
  DatabaseName: process.env["DATABASE_NAME"],

  BridgeHost: process.env["BRIDGE_HOST"] as string,
  BridgePort: parseInt(process.env["BRIDGE_PORT"]!) ?? 4433,
  BridgeAuthToken: process.env["BRIDGE_AUTH_TOKEN"] as string,
  BridgeTotalShards: "auto" as "auto" | number,
  BridgeTotalMachines: parseInt(process.env["BRIDGE_TOTAL_MACHINES"]!) ?? 1,
  BridgeShardsPerCluster:
    parseInt(process.env["BRIDGE_SHARDS_PER_CLUSTER"]!) ?? 2,

  DiscordClientId: process.env["DISCORD_CLIENT_ID"],
  DiscordClientSecret: process.env["DISCORD_CLIENT_SECRET"],
  DiscordPublicKey: process.env["DISCORD_PUBLIC_KEY"],
  DiscordToken: process.env["DISCORD_TOKEN"],
  DiscordRedirectUri: process.env["DISCORD_REDIRECT_URI"],

  RestProxyBaseUrl:
    process.env["REST_PROXY_BASE_URL"] || "https://discord.com/api",
  RestProxyAuthorization: process.env["REST_PROXY_AUTHORIZATION"],
  RestProxyAuthorizationHeader:
    process.env["REST_PROXY_AUTHORIZATION_HEADER"] || "authorization",
};
