import type { Bot } from "@discordeno/bot";
import type { CommandInteractionExecution } from "../types";

export class Component<B extends Bot> {
  customId: string | RegExp;
  execute: CommandInteractionExecution<B>;

  /**
   * Create a component
   * @param data The component data
   */
  constructor({
    customId,
    execute,
  }: {
    customId: string | RegExp;
    execute: CommandInteractionExecution<B>;
  }) {
    this.customId = customId;
    this.execute = execute;
  }
}
