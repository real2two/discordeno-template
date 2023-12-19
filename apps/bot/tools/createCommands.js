import { client } from "../src/config/client.js";
import { commands } from "../src/config/commands.js";

const transformedCommands = commands.map((c) => c.toJSON());

console.log(
  JSON.stringify(
    await client.helpers.upsertGlobalApplicationCommands(transformedCommands),
    (_, value) => (typeof value === "bigint" ? value.toString() : value),
    2,
  ),
);

process.exit();
