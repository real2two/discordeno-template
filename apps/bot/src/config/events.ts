import ready from "../events/ready";
import interactionCreate from "../events/interactionCreate";

import type { TransformedEventHandlers } from "@/discordeno-helpers";

export const events: Partial<TransformedEventHandlers> = {
  ready,
  interactionCreate,
};
