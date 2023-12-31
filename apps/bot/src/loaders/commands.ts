import { globSync } from "glob";
import { ApplicationCommand } from "@/discordeno-helpers";

const files = globSync("./src/commands/**/*.ts", {
  matchBase: true,
  nodir: true,
}).map((f) => `../${f.slice("src/".length)}`);
export const commands: ApplicationCommand[] = [];

for (const file of files) {
  const command = (await import(file)).default;
  if (command instanceof ApplicationCommand) {
    commands.push(command);
  }
}
