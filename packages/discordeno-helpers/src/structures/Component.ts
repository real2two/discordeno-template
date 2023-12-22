import type { InteractionExecution } from "../types/InteractionExecution";

export class Component {
  customId: string | RegExp;
  execute: InteractionExecution;

  constructor({
    customId,
    execute,
  }: {
    customId: string | RegExp;
    execute: InteractionExecution;
  }) {
    this.customId = customId;
    this.execute = execute;
  }
}
