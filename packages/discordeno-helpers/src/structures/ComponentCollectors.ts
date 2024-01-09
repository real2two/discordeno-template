import { ComponentCollector } from "./ComponentCollector";

import type { Interaction } from "@discordeno/bot";
import type {
  ComponentCollectorMessage,
  ComponentCollectorOptions,
  ExtendedBot,
} from "../types";

export class ComponentCollectors {
  client: ExtendedBot;
  collectors: { [key: string]: ComponentCollector };

  constructor(client: ExtendedBot) {
    this.client = client;
    this.collectors = {};
  }
  /**
   * Create an component collector using message
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
  get(messageId: bigint | string): ComponentCollector | undefined {
    return this.collectors[messageId.toString()];
  }
  remove(messageId: bigint | string) {
    delete this.collectors[messageId.toString()];
  }
}
