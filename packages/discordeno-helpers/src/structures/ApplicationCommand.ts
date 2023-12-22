import {
  ApplicationCommandTypes,
  camelToSnakeCase,
  type CreateApplicationCommand,
  type CreateSlashApplicationCommand,
  type CreateContextApplicationCommand,
} from "@discordeno/bot";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions";
import type {
  CommandExecution,
  ApplicationCommandOptionsList,
  Omit,
} from "../types";

interface SlashCommandConstructor
  extends Partial<Omit<CreateSlashApplicationCommand, "options">> {
  name: string;
  description: string;
  options?: ApplicationCommandOptionsList;
}

interface ContextConstructor extends Partial<CreateContextApplicationCommand> {
  name: string;
  description: string;
}

export class ApplicationCommand {
  data: SlashCommandConstructor | ContextConstructor;
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
