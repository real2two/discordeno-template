import {
  ApplicationCommand,
  ApplicationCommandOptions as opts,
} from "@/discordeno-helpers";

import { MessageComponentTypes, ButtonStyles } from "@discordeno/bot";

export default new ApplicationCommand({
  data: {
    name: "help",
    description: "Shows a small help menu with all commands the bot has.",
    options: {
      command: opts.string("The command to show help for.").autocomplete(),
    },
  },

  /** @param {import("../../types/commands").ExtendedCommandExecution} */
  async autocomplete({ client, interaction, options }) {
    console.log(options);
    interaction.respond({
      choices: [
        {
          name: "test",
          value: "testvalue",
        },
      ],
    });
  },

  /** @param {import("../../types/commands").ExtendedCommandExecution} */
  async execute({ client, interaction, options }) {
    await interaction.respond({
      content: "SO PRETEND I WANT",
      components: [
        {
          type: MessageComponentTypes.ActionRow,
          components: [
            {
              type: MessageComponentTypes.Button,
              style: ButtonStyles.Primary,
              label: "test",
              customId: "$test",
            },
            {
              type: MessageComponentTypes.Button,
              style: ButtonStyles.Link,
              label: "test",
              url: "https://google.com",
            },
          ],
        },
        {
          type: MessageComponentTypes.ActionRow,
          components: [
            {
              type: MessageComponentTypes.SelectMenuChannels,
              customId: "$components",
            },
          ],
        },
      ],
    });

    const collector =
      await client.collectors.components.createOriginalInteraction(
        interaction,
        {
          expiresIn: 5,
          events: {
            collect: (interaction) => {
              console.log(
                "Clicked button with ID",
                interaction.data.customId,
                interaction.data,
              );
              interaction.respond("Disabling collector...");

              collector.end(); // Skips end event
              // collector.remove(); // Does end event
            },
          },
        },
      );

    // const message = await client.helpers.sendFollowupMessage(interaction.token, {
    //   content: "test",
    // });
    // console.log(message);
  },
});
