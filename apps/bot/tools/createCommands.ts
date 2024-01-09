import { client } from "../src/main/client";
import { commands } from "../src/loaders/commands";

const transformedCommands = commands.map((c) => c.toJSON());

console.log(
  JSON.stringify(
    await client.helpers.upsertGlobalApplicationCommands(transformedCommands),
    (_, value) => (typeof value === "bigint" ? value.toString() : value),
    2,
  ),
);

process.exit();
