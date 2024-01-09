import { globSync } from "glob";
import type { createIPCMessageEvent } from "@/discordeno-helpers/src/utils/createIPCMessageEvent";

const files = globSync("./src/ipc/**/*.ts", {
  matchBase: true,
  nodir: true,
}).map((f) => `../${f.slice("src/".length)}`);
export const ipcs: ReturnType<typeof createIPCMessageEvent>[] = [];

for (const file of files) {
  const ipc = (await import(file)).default;
  ipcs.push(ipc);
}
