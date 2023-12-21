import ready from "../events/ready.ts";
import interactionCreate from "../events/interactionCreate.ts";

/** @type Partial<import("@discordeno/bot").EventHandlers> */
export const events = {
  ready,
  interactionCreate,
};
