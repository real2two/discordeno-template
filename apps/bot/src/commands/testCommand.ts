import { ApplicationCommand } from "@/discordeno-helpers";

import subcommandName from "./testCommand/subcommandName";
import subcommandWithGroup from "./testCommand/subcommandWithGroup";

export default new ApplicationCommand({
  data: {
    name: "testCommand",
    description: "test command",
    options: {
      subcommandName,
      subcommandWithGroup,
    },
  },
});
