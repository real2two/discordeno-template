import type { Interaction } from "@discordeno/bot";
import type { ExtendedBot } from "./";

export interface InteractionExecutionArguments<B extends ExtendedBot> {
  client: B;
  interaction: Interaction;
}

export type InteractionExecution<B extends ExtendedBot> = (
  data: InteractionExecutionArguments<B>,
) => void;
