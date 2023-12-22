import { InteractionHandler, type ExtendedClient } from "@/discordeno-helpers";

import { commands } from "../config/commands";
import { components } from "../config/components";

import type { Interaction } from "@discordeno/bot";

export default (client: ExtendedClient) => {
  const interactionHandler = new InteractionHandler({
    client,
    commands,
    components,
  });
  return {
    execute: (interaction: Interaction) => {
      interactionHandler.interactionCreate(interaction)
    },
  };
};
