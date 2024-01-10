import { ApplicationSubcommand } from "../../../utils/createFunctions";
import { getGuild } from "@/utils";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {},
  },
  async execute({ interaction }) {
    interaction.respond(
      "This is a subcommand group. (check console for guild db data)",
    );

    if (interaction.guildId) {
      const guild = await getGuild(interaction.guildId);
      console.log("guild data from database", guild);
    }
  },
});
