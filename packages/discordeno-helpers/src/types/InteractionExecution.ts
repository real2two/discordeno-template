import type {
  Bot,
  Interaction,
  Message,
  InteractionDataOption,
} from "@discordeno/bot";

import { CommandHandler } from "../structures/CommandHandler";

export interface InteractionExecutionArguments<B extends Bot> {
  client: B;
  options: InteractionDataOption[];
  command: CommandHandler<B>;
  interaction?: Interaction;
  message?: Message;
}

export interface InteractionExecutionInteractionArguments<B extends Bot> {
  client: B;
  options: InteractionDataOption[];
  interaction: Interaction;
}

export type InteractionExecution<B extends Bot> = (
  data: InteractionExecutionArguments<B>,
) => void;
