import { MessageComponentTypes } from "@discordeno/bot";

/**
 * @param {import("@discordeno/bot").Bot} client
 * @param {import("@discordeno/bot").CamelizedDiscordMessage} message
 */
export async function disableNonPersistentComponents(client, message) {
  if (!message || !message.id || !message.channelId) return;
  if (!message.components)
    return console.warn(
      "Missing components. Did you forget to use setComponents() or do await <Interaction>.respond before creating the collector?",
    );

  await client.helpers.editMessage(message.channelId, message.id, {
    components: message.components.map((component) => {
      if (component.type === MessageComponentTypes.ActionRow) {
        for (const subcomponent of component.components) {
          if (subcomponent.customId && subcomponent.customId.startsWith("$")) {
            subcomponent.disabled = true;
          }
        }
      }
      return component;
    }),
  });
}
