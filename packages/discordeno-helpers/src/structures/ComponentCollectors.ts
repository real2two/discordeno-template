import { ComponentCollector } from "./ComponentCollector";

import type { Bot, Interaction } from "@discordeno/bot";
import type {
  ComponentCollectorMessage,
  ComponentCollectorOptions,
} from "../types";

export class ComponentCollectors<B extends Bot> {
  client: B;
  collectors: { [key: string]: ComponentCollector<B> };

  /**
   * Create a component collectors manager
   * @param client The bot
   */
  constructor(client: B) {
    this.client = client;
    this.collectors = {};
  }
  /**
   * Create an component collector using message
   * @param message The message
   * @param opts The options
   * @returns The component collector
   */
  createMessage(
    message: ComponentCollectorMessage,
    opts: ComponentCollectorOptions,
  ) {
    const collector = new ComponentCollector(this, message, opts);
    this.collectors[message.id.toString()] = collector;
    return collector;
  }
  /**
   * Create an interaction collector using original interaction
   *
   * Only use this if you haven't used <Interaction>.getOriginalInteractionResponse() already.
   * Use <ComponentCollectors>.createMessage() if you already have access to the message data.
   *
   * @param interaction The interaction
   * @param opts The options
   * @returns The component collector
   */
  async createOriginalInteraction(
    interaction: Interaction,
    opts: ComponentCollectorOptions,
  ) {
    if (!interaction.acknowledged) await interaction.defer();
    const message = await this.client.helpers.getOriginalInteractionResponse(
      interaction.token,
    );
    return this.createMessage(message, opts);
  }
  /**
   * Get a message collector based on message ID
   * @param messageId The message ID
   * @returns The component collector if it exists
   */
  get(messageId: bigint | string): ComponentCollector<B> | undefined {
    return this.collectors[messageId.toString()];
  }
  /**
   * Remove a message collector based on message ID
   * @param messageId The message ID
   */
  remove(messageId: bigint | string) {
    delete this.collectors[messageId.toString()];
  }
}
