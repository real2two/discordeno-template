import type { Bot, CamelizedDiscordMessage } from "@discordeno/bot";

export async function removeComponents(
  client: Bot,
  message: CamelizedDiscordMessage,
) {
  if (!message || !message.id || !message.channelId) return;

  await client.helpers.editMessage(message.channelId, message.id, {
    components: [],
  });
}
