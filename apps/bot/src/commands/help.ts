import { ApplicationCommand } from "../utils/createFunctions";
import { ApplicationCommandOptions as opts } from "@/discordeno-helpers";

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

  async autocomplete({ client, interaction }) {
    interaction.respond({
      choices: [
        {
          name: "test",
          value: "testvalue",
        },
      ],
    });
  },

  async execute({ client, interaction }) {
    await interaction.respond({
      content: "Hello world",
    });

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
