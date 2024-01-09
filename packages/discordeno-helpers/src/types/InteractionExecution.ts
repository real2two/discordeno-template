import type { Interaction } from "@discordeno/bot";
import type { ExtendedBot } from "./ExtendedBot";

export interface InteractionExecutionArguments {
  client: ExtendedBot;
  interaction: Interaction;
}

export type InteractionExecution = (
  data: InteractionExecutionArguments,
) => void;
