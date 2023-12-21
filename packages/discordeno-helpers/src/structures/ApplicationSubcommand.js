import * as discord from "@discordeno/bot";
import { ApplicationCommand } from "./ApplicationCommand";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions";

export class ApplicationSubcommand extends ApplicationCommand {
  constructor(values) {
    if (values?.data?.type)
      values.data.type = discord.ApplicationCommandOptionTypes.SubCommandGroup;
    super(values);
  }
  toJSON() {
    return {
      ...this.data,
      options: ApplicationCommandOptions.parse(this.data.options),
    };
  }
}
