import * as discord from "@discordeno/bot";
import { ApplicationCommand } from "./ApplicationCommand.js";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions.js";

export class ApplicationSubcommand extends ApplicationCommand {
  constructor(values) {
    if (values?.data?.type)
      values.data.type = discord.ApplicationCommandOptionTypes.SubCommand;
    super(values);
  }
  toJSON() {
    return {
      ...this.data,
      options: ApplicationCommandOptions.parse(this.data.options),
    };
  }
}
