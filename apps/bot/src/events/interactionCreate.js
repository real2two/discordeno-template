import { InteractionHandler } from "@/discordeno-helpers";

import { commands } from "../config/commands";
import { components } from "../config/components";

/** @param {import("@discordeno/bot").Bot} client */
export default (client) => {
  const interactionHandler = new InteractionHandler({
    client,
    commands,
    components,
  });
  return {
    execute: (...args) => interactionHandler.interactionCreate(...args),
  };
};
