import { ApplicationCommandOptionTypes } from "@discordeno/bot";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions";

import type {
  ApplicationSubcommandConstructor,
  CommandExecution,
  ExtendedBot,
} from "../types";

export class ApplicationSubcommand<B extends ExtendedBot> {
  data: ApplicationSubcommandConstructor<B>;
  autocomplete?: CommandExecution<B>;
  execute?: CommandExecution<B>;

  constructor({
    data,
    autocomplete,
    execute,
  }: {
    data: ApplicationSubcommandConstructor<B>;
    autocomplete?: CommandExecution<B>;
    execute?: CommandExecution<B>;
  }) {
    if (!data.type && data.options) {
      // Set option type to either SubCommand or SubCommandGroup based on options.
      const optionsEntries = Object.values(data.options);

      const hasSubcommandGroups = optionsEntries.find(
        (options) =>
          options.data.type === ApplicationCommandOptionTypes.SubCommandGroup,
      );
      if (hasSubcommandGroups)
        throw new Error(
          "Cannot add subcommand group as options. If you want to create a subcommand group, set the options with only subcommands.",
        );

      const hasSubcommands = optionsEntries.find(
        (options) =>
          options.data.type === ApplicationCommandOptionTypes.SubCommand,
      );
      const hasNonSubcommands = optionsEntries.find(
        (options) =>
          options.data.type !== ApplicationCommandOptionTypes.SubCommand,
      );
      if (hasSubcommands && hasNonSubcommands)
        throw new Error(
          "Cannot have both subcommands and other option values in a subcommand",
        );

      if (hasSubcommands)
        data.type = ApplicationCommandOptionTypes.SubCommandGroup;
    }

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
