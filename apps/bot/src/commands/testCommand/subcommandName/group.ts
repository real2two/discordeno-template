import { ApplicationSubcommand } from "@/discordeno-helpers";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {},
  },
  execute({ interaction }) {
    interaction.respond("This is a subcommand group.");
  },
});
