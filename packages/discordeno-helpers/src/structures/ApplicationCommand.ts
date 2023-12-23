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
} from "../types";

export class ApplicationCommand {
  data:
    | ApplicationCommandSlashCommandConstructor
    | ApplicationCommandContextConstructor;
  autocomplete?: CommandExecution;
  execute?: CommandExecution;

  constructor({
    data,
    autocomplete,
    execute,
  }: {
    data: ApplicationCommand["data"];
    autocomplete?: CommandExecution;
    execute?: CommandExecution;
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
