import {
  ApplicationCommand,
  ApplicationCommandOptions as opts,
  CommandExecutionArguments,
} from "@/discordeno-helpers";

import { MessageComponentTypes, ButtonStyles } from "@discordeno/bot";

export default new ApplicationCommand({
  data: {
    name: "help",
    description: "Shows a small help menu with all commands the bot has.",
    options: {
      command: opts.string("The command to show help for.").autocomplete(),
      string: opts.string("test string value"),
      boolean: opts.boolean("test boolean value"),
      user: opts.user("test user value"),
      integer: opts.integer("test integer value"),
      number: opts.number("test number value"),
      channel: opts.channel("test channel value"),
      role: opts.role("test role value"),
      mentionable: opts.mentionable("test mentionable value"),
    },
  },

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
                interaction.data?.customId,
                interaction.data,
              );
              interaction.respond("Disabling collector...");

              collector.end(); // Executes end event (which disables the components as well)
              // collector.remove(); // Skips end event (aka it wont disable components by default)
            },
          },
        },
      );

    // Cache testing
    if (interaction.channelId) {
      console.log(
        "channel",
        await client.cache.channels.get(interaction.channelId),
      );
    }
    if (interaction.guildId) {
      console.log("guild", await client.cache.guilds.get(interaction.guildId));
      if (interaction.member) {
        console.log(
          "member",
          await client.cache.members.get(
            interaction.member.id,
            interaction.guildId,
          ),
        );
      }
    }
    if (interaction.member?.roles && interaction.member.roles[0])
      console.log(
        "role",
        await client.cache.roles.get(interaction.member?.roles[0]),
      );
    console.log("user", await client.cache.users.get(interaction.user.id));

    // const message = await client.helpers.sendFollowupMessage(interaction.token, {
    //   content: "test",
    // });
    // console.log(message);
  },
});
