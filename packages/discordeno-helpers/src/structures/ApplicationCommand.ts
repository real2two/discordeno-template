import {
  ApplicationCommandTypes,
  camelToSnakeCase,
  type CreateApplicationCommand,
  type CreateSlashApplicationCommand,
} from "@discordeno/bot";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions";
import type {
  ApplicationCommandSlashCommandConstructor,
  ApplicationCommandContextConstructor,
  CommandExecution,
  ExtendedBot,
} from "../types";

export class ApplicationCommand<B extends ExtendedBot> {
  data:
    | ApplicationCommandSlashCommandConstructor<B>
    | ApplicationCommandContextConstructor;
  autocomplete?: CommandExecution<B>;
  execute?: CommandExecution<B>;

  constructor({
    data,
    autocomplete,
    execute,
  }: {
    data: ApplicationCommand<B>["data"];
    autocomplete?: CommandExecution<B>;
    execute?: CommandExecution<B>;
  }) {
    this.data = {
      type: ApplicationCommandTypes.ChatInput,
      ...data,
    };
    this.autocomplete = autocomplete;
    this.execute = execute;
  }
  toJSON() {
    const command: CreateApplicationCommand = {
      ...(this.data as CreateApplicationCommand),
      name: camelToSnakeCase(this.data.name),
    };

    if ("options" in this.data) {
      (command as CreateSlashApplicationCommand)["options"] =
        ApplicationCommandOptions.parse(this.data["options"] || {});
    }

    return command;
  }
}
