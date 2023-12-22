import { ApplicationCommand } from "@/discordeno-helpers";

import subcommandName from "./testCommand/subcommandName";

export default new ApplicationCommand({
  data: {
    name: "testCommand",
    description: "test command",
    options: {
      subcommandName,
    },
  },
});
