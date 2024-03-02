import { ApplicationSubcommand } from "../../../utils/createFunctions";
import { getGuild } from "@/utils";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {},
  },
  async execute({ command }) {
    const { guildId } = command.data;

    command.respond({
      content: "This is a subcommand group. (check console for guild db data)",
    });

    if (guildId) {
      const guild = await getGuild(guildId);
      console.log("guild data from database", guild);
    }
  },
});
