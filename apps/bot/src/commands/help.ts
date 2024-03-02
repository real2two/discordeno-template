import { ApplicationCommand } from "../utils/createFunctions";
import { ApplicationCommandOptions as opts } from "@/discordeno-helpers";

// import { MessageComponentTypes, ButtonStyles } from "@discordeno/bot";

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

  async execute({ client, interaction, options }) {
    const guildId = interaction?.guildId 
    const channelId = interaction?.channelId
    const user = interaction?.user 
    const member = interaction?.member 

    await interaction.respond({
      content: "Hello world",
    });
    
    console.log(options);

    // Cache testing
    if (channelId) {
      console.log("channel", await client.cache.channels.get(channelId));
    }
    if (guildId) {
      console.log("guild", await client.cache.guilds.get(guildId));
      if (member) {
        console.log(
          "member",
          await client.cache.members.get(member.id, guildId),
        );
      }
    }
    if (member?.roles && member.roles[0]) {
      console.log("role", await client.cache.roles.get(member?.roles[0]));
    }
    if (user) {
      console.log("user", await client.cache.users.get(user.id));
    }

    // const message = await client.helpers.sendFollowupMessage(interaction.token, {
    //   content: "test",
    // });
    // console.log(message);
  },
});
