import type { Bot, Interaction } from "@discordeno/bot";

export interface InteractionExecutionArguments<B extends Bot> {
  client: B;
  interaction: Interaction;
}

export type InteractionExecution<B extends Bot> = (
  data: InteractionExecutionArguments<B>,
) => void;
