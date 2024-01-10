import { ApplicationCommand } from "../utils/createFunctions";

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
