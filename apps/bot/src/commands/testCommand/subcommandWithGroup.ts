import { ApplicationSubcommand } from "../../utils/createFunctions";

import group from "./subcommandWithGroup/group";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {
      group,
    },
  },
});
