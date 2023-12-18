/**
 * @param {import("@discordeno/bot").Bot} client
 * @param {import("@discordeno/bot").CamelizedDiscordMessage} message
 */
export async function removeComponents(client, message) {
  if (!message || !message.id || !message.channelId) return;

  await client.helpers.editMessage(message.channelId, message.id, {
    components: [],
  });
}
