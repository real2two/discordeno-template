import {
  ApplicationCommandOptionTypes,
  camelToSnakeCase,
} from "@discordeno/bot";

export class ApplicationCommandOptions {
  static parse(opts) {
    return Object.entries(opts || []).map(([name, data]) => ({
      name: camelToSnakeCase(name),
      ...data.toJSON(),
    }));
  }

  /** @param {string} description */
  static boolean(description) {
    return new this(ApplicationCommandOptionTypes.Boolean, description);
  }
  /** @param {string} description */
  static user(description) {
    return new this(ApplicationCommandOptionTypes.User, description);
  }
  /** @param {string} description */
  static integer(description) {
    return new this(ApplicationCommandOptionTypes.Integer, description);
  }
  /** @param {string} description */
  static number(description) {
    return new this(ApplicationCommandOptionTypes.Number, description);
  }
  /** @param {string} description */
  static string(description) {
    return new this(ApplicationCommandOptionTypes.String, description);
  }
  /** @param {string} description */
  static channel(description) {
    return new this(ApplicationCommandOptionTypes.Channel, description);
  }
  /** @param {string} description */
  static role(description) {
    return new this(ApplicationCommandOptionTypes.Role, description);
  }
  /** @param {string} description */
  static mentionable(description) {
    return new this(ApplicationCommandOptionTypes.Mentionable, description);
  }

  /**
   * @param {import("@discordeno/bot").ApplicationCommandTypes} type
   * @param {string} description
   * */
  constructor(type, description) {
    this.data = {
      type,
      description: description || "A description has not been set",
    };
  }

  /** @param {boolean} isRequired */
  required(isRequired = true) {
    this.data.required = Boolean(isRequired);
    return this;
  }

  /** @param {{name: string; value: string | number;}[]} choices */
  addChoice(...choices) {
    if (!this.data.choices) this.data.choices = [];
    for (const { name, value } of choices) {
      this.data.choices.push({
        name,
        value,
      });
    }
    return this;
  }

  /**
   * @param {number} min
   * @param {number} max
   * */
  setValues(min, max) {
    this.data.minValue = Number(min);
    this.data.maxValue = Number(max);
    return this;
  }

  /** @param {number} min */
  setMinValue(min) {
    this.data.minValue = Number(min);
    return this;
  }

  /** @param {number} max */
  setMinValue(max) {
    this.data.maxValue = Number(max);
    return this;
  }

  /**
   * @param {number} min
   * @param {number} max
   * */
  setLength(min, max) {
    this.data.minLength = Number(min);
    this.data.maxLength = Number(max);
    return this;
  }

  /** @param {number} min */
  setMinLength(min) {
    this.data.minLength = Number(min);
    return this;
  }

  /** @param {number} max */
  setMinLength(max) {
    this.data.maxLength = Number(max);
    return this;
  }

  /** @param {boolean} enabledAutocomplete */
  autocomplete(enabledAutocomplete = true) {
    this.data.autocomplete = Boolean(enabledAutocomplete);
    return this;
  }

  toJSON() {
    return this.data;
  }
}
