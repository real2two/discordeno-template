import type { Bot } from "@discordeno/bot";
import type { InteractionExecutionArguments } from "./";

export type CommandExecution<B extends Bot> = (
  data: InteractionExecutionArguments<B>,
) => void;
