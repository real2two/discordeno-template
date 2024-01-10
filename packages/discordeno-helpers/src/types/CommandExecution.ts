import type { InteractionExecutionArguments, ExtendedBot } from "./";

export interface CommandExecutionArguments<B extends ExtendedBot>
  extends InteractionExecutionArguments<B> {
  options: {
    [key: string]: string | number | boolean | undefined;
  };
}

export type CommandExecution<B extends ExtendedBot> = (
  data: CommandExecutionArguments<B>,
) => void;
