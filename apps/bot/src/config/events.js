import ready from "../events/ready.js";
import interactionCreate from "../events/interactionCreate.js";

/** @type Partial<import("@discordeno/bot").EventHandlers> */
export const events = {
  ready,
  interactionCreate,
};
