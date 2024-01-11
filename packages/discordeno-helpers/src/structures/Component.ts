import type { ExtendedBot, InteractionExecution } from "../types";

export class Component<B extends ExtendedBot> {
  customId: string | RegExp;
  execute: InteractionExecution<B>;

  /**
   * Create a component
   * @param data The component data
   */
  constructor({
    customId,
    execute,
  }: {
    customId: string | RegExp;
    execute: InteractionExecution<B>;
  }) {
    this.customId = customId;
    this.execute = execute;
  }
}
