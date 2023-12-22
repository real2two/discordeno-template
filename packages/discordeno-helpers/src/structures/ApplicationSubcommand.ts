import {
  ApplicationCommandOptionTypes,
  type Camelize,
  type DiscordApplicationCommandOption,
} from "@discordeno/bot";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions";

import type { ApplicationCommandOptionsList, CommandExecution } from "../types";

interface SubcommandConstructor
  extends Partial<Omit<Camelize<DiscordApplicationCommandOption>, "options">> {
  description: string;
  options?: ApplicationCommandOptionsList;
}

export class ApplicationSubcommand {
  data: SubcommandConstructor;
  autocomplete?: CommandExecution;
  execute?: CommandExecution;

  constructor({
    data,
    autocomplete,
    execute,
  }: {
    data: ApplicationSubcommand["data"];
    autocomplete?: CommandExecution;
    execute?: CommandExecution;
  }) {
    this.data = {
      type: ApplicationCommandOptionTypes.SubCommand,
      ...data,
    };
    this.autocomplete = autocomplete;
    this.execute = execute;
  }
  toJSON() {
    return {
      ...this.data,
      options: ApplicationCommandOptions.parse(this.data.options || {}),
    };
  }
}
