import type { Interaction } from "@discordeno/bot";
import type { ExtendedClient } from "./ExtendedBot";

export interface InteractionExecutionArguments {
  client: ExtendedClient;
  interaction: Interaction;
}

export type InteractionExecution = (
  data: InteractionExecutionArguments,
) => unknown;
