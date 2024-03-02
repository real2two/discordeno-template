import {
  ApplicationCommandTypes,
  camelToSnakeCase,
  type Bot,
  type CreateApplicationCommand,
  type CreateSlashApplicationCommand,
} from "@discordeno/bot";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions";
import type {
  ApplicationCommandSlashCommandConstructor,
  ApplicationCommandContextConstructor,
  CommandInteractionExecution,
} from "../types";

export class ApplicationCommand<B extends Bot> {
  data:
    | ApplicationCommandSlashCommandConstructor<B>
    | ApplicationCommandContextConstructor;
  autocomplete?: CommandInteractionExecution<B>;
  execute?: CommandInteractionExecution<B>;

  /**
   * Create an application command
   * @param data The command data
   */
  constructor({
    data,
    autocomplete,
    execute,
  }: {
    data: ApplicationCommand<B>["data"];
    autocomplete?: CommandInteractionExecution<B>;
    execute?: CommandInteractionExecution<B>;
  }) {
    this.data = {
      type: ApplicationCommandTypes.ChatInput,
      ...data,
    };
    this.autocomplete = autocomplete;
    this.execute = execute;
  }

  /**
   * Convert command data into the format for creating and modifying commands
   * @returns The command data in JSON
   */
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
