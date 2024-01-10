import { globSync } from "glob";
import { ApplicationCommand } from "@/discordeno-helpers";

import type { client } from "../main/client";

const files = globSync("./src/commands/**/*.ts", {
  matchBase: true,
  nodir: true,
}).map((f) => `../${f.slice("src/".length)}`);
export const commands: ApplicationCommand<typeof client>[] = [];

for (const file of files) {
  const command = (await import(file)).default;
  if (command instanceof ApplicationCommand) {
    commands.push(command);
  }
}
