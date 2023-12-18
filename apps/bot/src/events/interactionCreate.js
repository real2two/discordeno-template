import { InteractionHandler } from "@/discordeno-helpers";

import { client } from "../config/client.js";
import { commands } from "../config/commands.js";
import { components } from "../config/components.js";

const interactionHandler = new InteractionHandler({
  client,
  commands,
  components,
});

export const interactionCreate = (...args) =>
  interactionHandler.interactionCreate(...args);
