import { ApplicationSubcommand } from "@/discordeno-helpers";

import group from "./subcommandName/group";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {
      group,
    },
  },
});
