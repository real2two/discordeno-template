import { bot } from "../src/main/bot";
import { commands } from "../src/loaders/commands";

const transformedCommands = commands.map((c) => c.toJSON());

console.log(
  JSON.stringify(
    await bot.helpers.upsertGlobalApplicationCommands(transformedCommands),
    (_, value) => (typeof value === "bigint" ? value.toString() : value),
    2,
  ),
);

process.exit();
