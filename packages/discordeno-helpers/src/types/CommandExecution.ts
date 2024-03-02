import type { Bot } from "@discordeno/bot";
import type {
  InteractionExecutionArguments,
  InteractionExecutionInteractionArguments,
} from "./";

export type CommandExecution<B extends Bot> = (
  data: InteractionExecutionArguments<B>,
) => void;

export type CommandInteractionExecution<B extends Bot> = (
  data: InteractionExecutionInteractionArguments<B>,
) => void;
