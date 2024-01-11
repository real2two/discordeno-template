import type { Bot, CamelizedDiscordMessage } from "@discordeno/bot";

/**
 * Removes the components on a message
 * @param client The client
 * @param message The message
 */
export function removeComponents(
  client: Bot,
  message: CamelizedDiscordMessage,
) {
  if (!message || !message.id || !message.channelId) return;

  return client.helpers.editMessage(message.channelId, message.id, {
    components: [],
  });
}
