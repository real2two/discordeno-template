import { InteractionHandler } from "@/discordeno-helpers";
import { createEvent } from "../utils/createFunctions";

import { commands } from "../loaders/commands";
import { components } from "../loaders/components";

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
