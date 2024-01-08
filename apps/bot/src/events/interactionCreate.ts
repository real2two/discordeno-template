import { createEvent, InteractionHandler } from "@/discordeno-helpers";

import { commands } from "../handlers/commands";
import { components } from "../handlers/components";

export default createEvent("interactionCreate", (client) => {
  const interactionHandler = new InteractionHandler({
    client,
    commands,
    components,
  });

  return (interaction) => {
    interactionHandler.interactionCreate(interaction);
  };
});
