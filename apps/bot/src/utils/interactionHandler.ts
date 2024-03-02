import { InteractionHandler } from "@/discordeno-helpers";

import { commands } from "../loaders/commands";
import { components } from "../loaders/components";

export const interactionHandler = new InteractionHandler({
  commands,
  components,
});
