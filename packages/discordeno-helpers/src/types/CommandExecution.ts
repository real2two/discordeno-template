import type { InteractionExecutionArguments } from "./InteractionExecution";

export interface CommandExecutionArguments
  extends InteractionExecutionArguments {
  options: {
    [key: string]: string | number | boolean | undefined;
  };
}

export type CommandExecution = (data: CommandExecutionArguments) => void;
