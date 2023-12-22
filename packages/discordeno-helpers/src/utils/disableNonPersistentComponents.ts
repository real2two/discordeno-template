import {
  MessageComponentTypes,
  type Bot,
  type ActionRow,
} from "@discordeno/bot";
import type { ComponentCollectorMessage } from "../types";

export async function disableNonPersistentComponents(
  client: Bot,
  message: ComponentCollectorMessage,
) {
  if (!message || !message.id || !message.channelId) return;
  if (!message.components)
    return console.warn(
      "Missing components. Did you forget to use setComponents() or do await <Interaction>.respond before creating the collector?",
    );

  await client.helpers.editMessage(message.channelId, message.id, {
    components: message.components.map((component) => {
      if (
        component.type === MessageComponentTypes.ActionRow &&
        component.components
      ) {
        for (const subcomponent of component.components) {
          if (subcomponent.customId && subcomponent.customId.startsWith("$")) {
            subcomponent["disabled"] = true;
          }
        }
      }
      return component;
    }) as ActionRow[],
  });
}
