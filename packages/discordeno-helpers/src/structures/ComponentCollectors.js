import { ComponentCollector } from "./ComponentCollector";

export class ComponentCollectors {
  /**
   * @param {import("@discordeno/bot").Bot} client
   */
  constructor(client) {
    this.client = client;
    this.collectors = {};
  }
  /**
   * Create an component collector using message
   * @param {import("../../types/ComponentCollector.ts").ComponentCollectorMessage} message The message
   * @param {import("../../types/ComponentCollector.ts").ComponentCollectorOptions} opts The options
   * @returns {ComponentCollector}
   */
  createMessage(message, opts) {
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
   * @param {import("@discordeno/bot").Interaction} interaction The interaction
   * @param {import("../../types/ComponentCollector.ts").ComponentCollectorOptions} opts The options
   * @returns {Promise<ComponentCollector>}
   */
  async createOriginalInteraction(interaction, opts) {
    if (!interaction.acknowledged) await interaction.defer();
    const message = await this.client.helpers.getOriginalInteractionResponse(
      interaction.token,
    );
    return this.createMessage(message, opts);
  }
  /** @returns {ComponentCollector | undefined} */
  get(messageId) {
    return this.collectors[messageId.toString()];
  }
  remove(messageId) {
    delete this.collectors[messageId.toString()];
  }
}
