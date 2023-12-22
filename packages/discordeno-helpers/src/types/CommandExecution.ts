import type { InteractionExecutionArguments } from "./InteractionExecution";

export interface CommandExecutionArguments
  extends InteractionExecutionArguments {
  options: {
    [key: string]: string | number;
  };
}

export type CommandExecution = (data: CommandExecutionArguments) => void;
