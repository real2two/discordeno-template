import { client } from "../src/config/client.js";
import { commands } from "../src/config/commands.js";

/** @type import("discord-api-types/v10").RESTPutAPIApplicationCommandsJSONBody */
const transformedCommands = commands.map((c) => c.toJSON());

console.log(
  JSON.stringify(
    await client.helpers.upsertGlobalApplicationCommands(transformedCommands),
    (_, value) => (typeof value === "bigint" ? value.toString() : value),
    2,
  ),
);

process.exit();
