import {
  ApplicationCommandOptionTypes,
  camelToSnakeCase,
  type Bot,
  type Camelize,
  type DiscordApplicationCommandOption,
} from "@discordeno/bot";

import type {
  ApplicationCommandOptionsList,
  DiscordApplicationCommandOptionWithoutName,
} from "../types";

export class ApplicationCommandOptions {
  data: DiscordApplicationCommandOptionWithoutName;

  static parse<B extends Bot>(
    opts: ApplicationCommandOptionsList<B>,
  ): Camelize<DiscordApplicationCommandOption[]> {
    return Object.entries(opts || []).map(([name, data]) => ({
      ...data.toJSON(),
      name: camelToSnakeCase(name),
    })) as Camelize<DiscordApplicationCommandOption[]>;
  }

  static boolean(description: string) {
    return new this(ApplicationCommandOptionTypes.Boolean, description);
  }
  static user(description: string) {
    return new this(ApplicationCommandOptionTypes.User, description);
  }
  static integer(description: string) {
    return new this(ApplicationCommandOptionTypes.Integer, description);
  }
  static number(description: string) {
    return new this(ApplicationCommandOptionTypes.Number, description);
  }
  static string(description: string) {
    return new this(ApplicationCommandOptionTypes.String, description);
  }
  static channel(description: string) {
    return new this(ApplicationCommandOptionTypes.Channel, description);
  }
  static role(description: string) {
    return new this(ApplicationCommandOptionTypes.Role, description);
  }
  static mentionable(description: string) {
    return new this(ApplicationCommandOptionTypes.Mentionable, description);
  }
  static attachment(description: string) {
    return new this(ApplicationCommandOptionTypes.Attachment, description);
  }

  constructor(type: ApplicationCommandOptionTypes, description: string) {
    this.data = {
      type,
      description: description || "A description has not been set",
    };
  }

  required(isRequired = true) {
    this.data.required = Boolean(isRequired);
    return this;
  }

  addChoice(...choices: { name: string; value: string | number }[]) {
    if (!this.data.choices) this.data.choices = [];
    for (const { name, value } of choices) {
      this.data.choices.push({
        name,
        value,
      });
    }
    return this;
  }

  setValues(min: number, max: number) {
    this.data.minValue = Number(min);
    this.data.maxValue = Number(max);
    return this;
  }

  setMinValue(min: number) {
    this.data.minValue = Number(min);
    return this;
  }

  setMaxValue(max: number) {
    this.data.maxValue = Number(max);
    return this;
  }

  setLength(min: number, max: number) {
    this.data.minLength = Number(min);
    this.data.maxLength = Number(max);
    return this;
  }

  setMinLength(min: number) {
    this.data.minLength = Number(min);
    return this;
  }

  setMaxLength(max: number) {
    this.data.maxLength = Number(max);
    return this;
  }

  autocomplete(enabledAutocomplete = true) {
    this.data.autocomplete = Boolean(enabledAutocomplete);
    return this;
  }

  toJSON() {
    return this.data;
  }
}
