import { ApplicationCommandTypes, camelToSnakeCase } from "@discordeno/bot";
import { ApplicationCommandOptions } from "./ApplicationCommandOptions.js";

export class ApplicationCommand {
  constructor({ data, autocomplete, execute }) {
    this.data = {
      type: ApplicationCommandTypes.ChatInput,
      ...data,
    };
    this.autocomplete = autocomplete;
    this.execute = execute;
  }
  toJSON() {
    const command = {};

    command.type = this.data.type;

    command.name = camelToSnakeCase(this.data.name);
    command.description = this.data.description;

    command.defaultMemberPermissions = this.data.defaultMemberPermissions;
    command.dmPermission = this.data.dmPermission || false;
    command.nsfw = this.data.nsfw || false;

    if (this.data.options) {
      command.options = ApplicationCommandOptions.parse(this.data.options);
    }

    return command;
  }
}
