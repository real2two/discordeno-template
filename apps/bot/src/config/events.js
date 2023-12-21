import ready from "../events/ready";
import interactionCreate from "../events/interactionCreate";

/** @type Partial<import("@discordeno/bot").EventHandlers> */
export const events = {
  ready,
  interactionCreate,
};
