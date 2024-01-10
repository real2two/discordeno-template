import { globSync } from "glob";
import { Component } from "@/discordeno-helpers";

import type { client } from "../main/bot";

const files = globSync("./src/components/**/*.ts", {
  matchBase: true,
  nodir: true,
}).map((f) => `../${f.slice("src/".length)}`);
export const components: Component<typeof client>[] = [];

for (const file of files) {
  const component = (await import(file)).default;
  if (component instanceof Component) {
    components.push(component);
  }
}
