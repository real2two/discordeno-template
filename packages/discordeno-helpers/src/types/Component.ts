import type { InteractionExecution } from "./InteractionExecution";

export interface Component {
  customId: string | RegExp;
  execute: InteractionExecution;
}
