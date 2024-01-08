import {
  createEvent,
  InteractionHandler,
} from "@/discordeno-helpers";

import { commands } from "../config/commands";
import { components } from "../config/components";

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
