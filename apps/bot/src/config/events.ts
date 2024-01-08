import { globSync } from "glob";
import { createEvent } from "@/discordeno-helpers";

const files = globSync("./src/events/**/*.ts", {
  matchBase: true,
  nodir: true,
}).map((f) => `../${f.slice("src/".length)}`);
export const events: ReturnType<typeof createEvent>[] = [];

for (const file of files) {
  const event = (await import(file)).default;
  events.push(event);
}
