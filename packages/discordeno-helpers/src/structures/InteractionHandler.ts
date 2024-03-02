import {
  InteractionTypes,
  ApplicationCommandTypes,
  ApplicationCommandOptionTypes,
  camelToSnakeCase,
  type Bot,
  type Interaction,
  type Message,
  type InteractionDataOption,
  type CreateMessageOptions,
} from "@discordeno/bot";

import { ApplicationSubcommand } from "./ApplicationSubcommand";
import { Component } from "./Component";

import { ApplicationCommandOptions } from "./ApplicationCommandOptions";

import { ApplicationCommand } from "./ApplicationCommand";
import { CommandHandler } from "./CommandHandler";

import type {
  ApplicationCommandSlashCommandConstructor,
  CommandExecution,
  TransformedApplicationCommand,
} from "../types";

export class InteractionHandler<B extends Bot> {
  commands: TransformedApplicationCommand<B>[];
  components: Component<B>[];

  /**
   * Transform the command data into a searchable format
   *
   * This converts the commands into this format:
   * [
   *  {
   *   search: {
   *    type: COMMAND_TYPE,
   *    name: CAMELIZED_COMMAND_NAME,
   *   },
   *   command: COMMAND,
   *   subcommands: [
   *    {
   *     subcommand: SUBCOMMAND,
   *     subcommands: [...]
   *     ]
   *    },
   *    ...
   *   ]
   *  },
   *  ...
   * ]
   *
   * @param commands The application commands
   * @returns The transformed commands in a searchable format
   */
  static transformCommands<B extends Bot>(commands: ApplicationCommand<B>[]) {
    return [...commands].map((command) => ({
      search: {
        type: command.data.type,
        name:
          command.data.type === ApplicationCommandTypes.ChatInput
            ? camelToSnakeCase(command.data.name)
            : command.data.name,
      },
      command,
      syntax: InteractionHandler.generateSyntax(command),
      subcommands: Object.fromEntries(
        Object.entries(
          ("options" in command.data ? command.data["options"] : {}) || {},
        )
          .filter(([_, v]) => v instanceof ApplicationSubcommand)
          .map(([k, v]) => [
            camelToSnakeCase(k),
            {
              subcommand: v,
              syntax: InteractionHandler.generateSyntax(
                v as ApplicationSubcommand<B>,
              ),
              subcommands:
                v.data.type === ApplicationCommandOptionTypes.SubCommandGroup
                  ? Object.fromEntries(
                      Object.entries(
                        ("options" in v.data ? v.data["options"] : {}) || {},
                      )
                        .filter(([_, v]) => v instanceof ApplicationSubcommand)
                        .map(([k, v]) => [
                          camelToSnakeCase(k),
                          {
                            subcommand: v,
                            syntax: InteractionHandler.generateSyntax(
                              v as ApplicationSubcommand<B>,
                            ),
                            subcommands: {},
                          },
                        ]),
                    )
                  : {},
            },
          ]),
      ),
    })) as TransformedApplicationCommand<B>[];
  }

  static generateSyntax<B extends Bot>(
    command: ApplicationCommand<B> | ApplicationSubcommand<B>,
  ) {
    const options = Object.entries(
      ("options" in command.data ? command.data["options"] : {}) || {},
    );

    const subcommands = options.filter(
      ([_, v]) => v instanceof ApplicationSubcommand,
    );
    if (subcommands.length) {
      const args = options.map(([k]) => k).join("/");
      return `${command.data.name} <${args}>`;
    }

    const args = options
      .sort(
        (a, b) =>
          Number(b[1].data.required || false) -
          Number(a[1].data.required || false),
      )
      .map(([k, v]) => {
        if (v.data.required) {
          return `<${k}>`;
        } else {
          return `[${k}]`;
        }
      })
      .join(" ");
    return `${command.data.name} ${args}`;
  }

  /**
   * Create an interaction handler
   * @param data The interaction handler data
   */
  constructor({
    commands,
    components,
  }: {
    commands: ApplicationCommand<B>[];
    components: Component<B>[];
  }) {
    this.commands = InteractionHandler.transformCommands(commands || []);
    this.components = components || [];
  }

  /**
   * The interaction handler, which must be used in interactionCreate
   * @param interaction The interaction
   */
  async interactionCreate({
    client,
    interaction,
  }: {
    client: B;
    interaction: Interaction;
  }) {
    try {
      if (!interaction.data) return;

      if (
        [
          InteractionTypes.ApplicationCommand,
          InteractionTypes.ApplicationCommandAutocomplete,
        ].includes(interaction.type)
      ) {
        // Handle command
        if (!interaction.data.type) return;

        const commandData = this.commands.find(
          (c) =>
            c.search.type === interaction.data?.type &&
            c.search.name === interaction.data?.name,
        );

        if (!commandData) {
          return console.warn("Couldn't find command", interaction.data);
        }

        const { command, subcommands } = commandData;

        if (
          interaction.data?.options &&
          interaction.data.options.length === 1 &&
          [
            ApplicationCommandOptionTypes.SubCommand,
            ApplicationCommandOptionTypes.SubCommandGroup,
          ].includes(interaction.data.options[0].type)
        ) {
          // Handle subcommand or subcommand group

          const subcommandData = subcommands[interaction.data.options[0].name];
          if (!subcommandData) {
            return console.warn(
              `Couldn't find subcommand or subcommand group`,
              interaction.data,
            );
          }

          const { subcommand, subcommands: subcommandsInGroup } =
            subcommandData;

          switch (interaction.data.options[0].type) {
            case ApplicationCommandOptionTypes.SubCommand: {
              // Handle subcommand
              return this.handleChatInputCommand({
                client,
                interaction,
                command: subcommand,
                options: interaction.data.options[0].options || [],
              });
            }
            case ApplicationCommandOptionTypes.SubCommandGroup: {
              // Handle subcommand group
              if (!interaction.data.options[0].options) return;

              const subcommandInGroup =
                subcommandsInGroup[interaction.data.options[0].options[0].name];
              if (!subcommandInGroup) {
                return console.warn(
                  `Couldn't find subcommand in a subcommand group`,
                  interaction.data,
                );
              }

              return this.handleChatInputCommand({
                client,
                interaction,
                command: subcommandInGroup.subcommand,
                options: interaction.data.options[0].options[0].options || [],
              });
            }
          }
        }

        // Handle command
        return this.handleChatInputCommand({
          client,
          interaction,
          command,
          options: interaction.data.options || [],
        });
      }

      if (
        [
          InteractionTypes.MessageComponent,
          InteractionTypes.ModalSubmit,
        ].includes(interaction.type)
      ) {
        if (!interaction.data.customId) return;

        // Message component handler
        for (const { customId, execute } of this.components) {
          if (
            typeof customId === "string"
              ? customId === interaction.data.customId
              : customId.test(interaction.data.customId)
          ) {
            execute({
              client,
              interaction,
              options: interaction.data?.options || [],
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * The message command handler, which must be used in messageCreate
   * @param message The message
   */
  async messageCreate(
    {
      client,
      message,
      prefix,
    }: {
      client: B;
      message: Message;
      prefix: string;
    },
    opts?: {
      createErrorMessage: (data: {
        error: string;
        syntax: string;
        message?: string;
      }) => CreateMessageOptions;
    },
  ) {
    if (!opts)
      opts = {
        createErrorMessage: ({ error, syntax, message }) => ({
          content: `${
            error !== "NOT_SUPPORTED"
              ? `Incorrect usage. The correct syntax is \`${syntax}\`.\n\n`
              : ""
          }${message || ""}`,
        }),
      };

    try {
      if (!message.content?.startsWith(prefix)) return;

      const args = message.content
        .slice(prefix.length)
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .filter((a) => a);

      const commandName = args.shift()?.toLowerCase();
      const commandData = this.commands.find(
        (c) =>
          c.search.type === ApplicationCommandTypes.ChatInput &&
          c.search.name.replace(/_/g, "") === commandName?.replace(/_/g, ""),
      );

      if (!commandData) return;

      const { command, syntax, subcommands } = commandData;
      if (Object.keys(subcommands).length) {
        // The message is a subcommand

        const subcommandName = args.shift()?.toLowerCase();
        if (!subcommandName) {
          // Missing subcommand
          return client.helpers.sendMessage(
            message.channelId,
            opts.createErrorMessage({
              error: "MISSING_SUBCOMMAND",
              syntax,
            }),
          );
        }

        const subcommandData = Object.entries(subcommands).find(
          ([k]) => k.replace(/_/g, "") === subcommandName.replace(/_/g, ""),
        )?.[1];
        if (!subcommandData) {
          // Invalid subcommand
          return client.helpers.sendMessage(
            message.channelId,
            opts.createErrorMessage({
              error: "INVALID_SUBCOMMAND",
              syntax,
            }),
          );
        }

        const {
          subcommand,
          syntax: subcommandSyntax,
          subcommands: subcommandsInGroup,
        } = subcommandData;

        if (Object.keys(subcommandsInGroup).length) {
          // Handle subcommand group
          const subcommandGroupName = args.shift()?.toLowerCase();
          if (!subcommandGroupName) {
            // Missing subcommand group
            return client.helpers.sendMessage(
              message.channelId,
              opts.createErrorMessage({
                error: "MISSING_SUBCOMMAND_GROUP",
                syntax,
              }),
            );
          }

          const subcommandInGroup = Object.entries(subcommandsInGroup).find(
            ([k]) =>
              k.replace(/_/g, "") === subcommandGroupName.replace(/_/g, ""),
          )?.[1];
          if (!subcommandInGroup) {
            // Invalid subcommand group
            return client.helpers.sendMessage(
              message.channelId,
              opts.createErrorMessage({
                error: "INVALID_SUBCOMMAND_GROUP",
                syntax,
              }),
            );
          }

          const options = this.transformMessageOptions({
            client,
            syntax: subcommandInGroup.syntax,
            command: subcommandInGroup.subcommand,
            message,
            args,
            opts,
          });
          if (!options) return; // Command doesn't support message command

          return this.handleChatInputCommand({
            client,
            message,
            command: subcommandInGroup.subcommand,
            options,
          });
        } else {
          // Handle subcommand
          const options = this.transformMessageOptions({
            client,
            syntax: subcommandSyntax,
            command: subcommand,
            message,
            args,
            opts,
          });
          if (!options) return; // Command doesn't support message command

          return this.handleChatInputCommand({
            client,
            message,
            command: subcommand,
            options,
          });
        }
      } else {
        // Handle message as a command with no subcommands
        const options = this.transformMessageOptions({
          client,
          syntax: syntax,
          command,
          message,
          args,
          opts,
        });
        if (!options) return; // Command doesn't support message command

        return this.handleChatInputCommand({
          client,
          message,
          command,
          options,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Handle message options
   * @param data The options data
   * @returns The options
   */
  transformMessageOptions({
    client,
    syntax,
    command,
    message,
    args,
    opts,
  }: {
    client: B;
    syntax: string;
    command:
      | (ApplicationCommand<B> & {
          data: ApplicationCommandSlashCommandConstructor<B>;
        })
      | ApplicationSubcommand<B>;
    message: Message;
    args: string[];
    opts: {
      createErrorMessage: (data: {
        error: string;
        syntax: string;
        message?: string;
      }) => CreateMessageOptions;
    };
  }) {
    const commandOptions = Object.entries(command.data.options || {})
      .filter(([_, d]) => d instanceof ApplicationCommandOptions)
      .sort(
        (a, b) =>
          Number(b[1].data.required || false) -
          Number(a[1].data.required || false),
      ) as [string, ApplicationCommandOptions][];
    if (!commandOptions.length) return [];

    const options: InteractionDataOption[] = [];
    if (commandOptions.length === 1) {
      const [optionName, optionData] = commandOptions[0];
      const arg = args.join(" ");

      const option = this.transformMessageOption({
        client,
        syntax,
        message,
        optionName,
        optionData,
        arg,
        opts,
      });
      if (!option) return;

      if (option.data !== undefined) {
        options.push(option.data);
      }
    } else {
      for (const [optionName, optionData] of commandOptions) {
        const arg = args.shift();

        const option = this.transformMessageOption({
          client,
          syntax,
          message,
          optionName,
          optionData,
          arg,
          opts,
        });
        if (!option) return;

        if (option.data !== undefined) {
          options.push(option.data);
        }
      }
    }

    return options;
  }
  /**
   * Hnadles message option
   * @param data The option data
   * @returns The option
   */
  transformMessageOption({
    client,
    syntax,
    message,
    optionName,
    optionData,
    arg,
    opts,
  }: {
    client: B;
    syntax: string;
    message: Message;
    optionName: string;
    optionData: ApplicationCommandOptions;
    arg: string | undefined;
    opts: {
      createErrorMessage: (data: {
        error: string;
        syntax: string;
        message?: string;
      }) => CreateMessageOptions;
    };
  }) {
    if (!arg) {
      if (optionData.data.required) {
        // Missing argument
        client.helpers.sendMessage(
          message.channelId,
          opts.createErrorMessage({
            error: "OPTIONS_MISSING_ARGUMENT",
            syntax,
          }),
        );
        return;
      } else {
        return {
          data: undefined,
        };
      }
    }

    /*
      This message command handler currently supports:
      String, Integer, Boolean, User, Channel, Role, Mentionable, Number
    */
    if (optionData.data.type < 3 || optionData.data.type > 10) {
      // This command does not support message commands, because it doesn't support the option type
      client.helpers.sendMessage(
        message.channelId,
        opts.createErrorMessage({
          error: "OPTIONS_NOT_SUPPORTED",
          syntax,
          message:
            "This command does not support message commands. Please use the slash command version of the command instead.",
        }),
      );
      return;
    }

    const checkMessageOptionChoices = (
      choices: { name: string; value: string | number }[],
    ) => {
      let success = false;
      for (const choice of choices) {
        if ([choice.name || choice.value].includes(arg || Number(arg))) {
          success = true;
          break;
        }
      }
      if (!success) {
        client.helpers.sendMessage(
          message.channelId,
          opts.createErrorMessage({
            error: "OPTIONS_INVALID_CHOICE",
            syntax,
            message: `The argument \`${optionName}\` must be either one of these choices: \`${choices.join(
              "`, `",
            )}\`.`,
          }),
        );
      }
      return success;
    };

    // Handle option based on option type
    let value: string | boolean | number | undefined;

    if (optionData.data.type === ApplicationCommandOptionTypes.String) {
      // Handle string
      if (optionData.data.choices?.length) {
        if (!checkMessageOptionChoices(optionData.data.choices)) return;
      } else if (optionData.data.minLength || optionData.data.maxLength) {
        const minLength = optionData.data.minLength || 0;
        const maxLength = optionData.data.maxLength || 6000;
        if (arg.length < minLength || arg.length > maxLength) {
          client.helpers.sendMessage(
            message.channelId,
            opts.createErrorMessage({
              error: "OPTIONS_INVALID_STRING_LENGTH",
              syntax,
              message: `The argument \`${optionName}\` must be at least ${minLength} and less than or equal to ${maxLength}.`,
            }),
          );
          return;
        }

        value = arg;
      }
    } else if (optionData.data.type === ApplicationCommandOptionTypes.Integer) {
      const number = parseInt(arg);
      if (isNaN(number) || number.toString() !== arg) {
        // Handle integer
        client.helpers.sendMessage(
          message.channelId,
          opts.createErrorMessage({
            error: "OPTIONS_INVALID_INTEGER",
            syntax,
            message: `The argument \`${optionName}\` must be an integer.`,
          }),
        );
        return;
      }
      if (optionData.data.choices?.length) {
        if (!checkMessageOptionChoices(optionData.data.choices)) return;
      } else if (optionData.data.minValue || optionData.data.maxValue) {
        const minValue = optionData.data.minValue || 0;
        const maxValue = optionData.data.minValue || Number.MAX_SAFE_INTEGER;
        if (number < minValue || number > maxValue) {
          client.helpers.sendMessage(
            message.channelId,
            opts.createErrorMessage({
              error: "OPTIONS_INVALID_INTEGER_VALUE",
              syntax,
              message: `The argument \`${optionName}\` must at least ${minValue}${
                maxValue === Infinity
                  ? ""
                  : `and less than or equal to ${maxValue}`
              }.`,
            }),
          );
          return;
        }
      }
      value = number;
    } else if (optionData.data.type === ApplicationCommandOptionTypes.Number) {
      // Handle numbers
      const number = parseFloat(arg);
      if (isNaN(number)) {
        // Handle integer
        client.helpers.sendMessage(
          message.channelId,
          opts.createErrorMessage({
            error: "OPTIONS_INVALID_NUMBER",
            syntax,
            message: `The argument \`${optionName}\` must be a number.`,
          }),
        );
        return;
      }
      if (optionData.data.choices?.length) {
        if (!checkMessageOptionChoices(optionData.data.choices)) return;
      } else if (optionData.data.minValue || optionData.data.maxValue) {
        const minValue = optionData.data.minValue || 0;
        const maxValue = optionData.data.minValue || Number.MAX_SAFE_INTEGER;
        if (number < minValue || number > maxValue) {
          client.helpers.sendMessage(
            message.channelId,
            opts.createErrorMessage({
              error: "OPTIONS_INVALID_NUMBER_VALUE",
              syntax,
              message: `The argument \`${optionName}\` must at least ${minValue}${
                maxValue === Infinity
                  ? ""
                  : `and less than or equal to ${maxValue}`
              }.`,
            }),
          );
          return;
        }
      }
      value = number;
    } else if (optionData.data.type === ApplicationCommandOptionTypes.Boolean) {
      // Handle booleans
      const argLowerCase = arg.toLowerCase();
      if (["true", "false"].includes(argLowerCase)) {
        value = Boolean(argLowerCase);
      } else {
        // Must be a boolean
        client.helpers.sendMessage(
          message.channelId,
          opts.createErrorMessage({
            error: "OPTIONS_INVALID_BOOLEAN",
            syntax,
            message: `The argument \`${optionName}\` must be a boolean (true/false).`,
          }),
        );
        return;
      }
    } else if (
      [
        ApplicationCommandOptionTypes.User,
        ApplicationCommandOptionTypes.Channel,
        ApplicationCommandOptionTypes.Role,
        ApplicationCommandOptionTypes.Mentionable,
      ].includes(optionData.data.type)
    ) {
      // Handle snowflakes
      // Warning: Does not check if the user/channel/role/mentionable is valid!
      const id = arg.replace(/[^0-9]/g, " ").trim();
      if (new RegExp("^(\\d{17,21})$").test(id)) {
        value = id;
      } else {
        const type = Object.entries(ApplicationCommandOptionTypes)
          .find(([_, o]) => o == optionData.data.type)?.[0]
          ?.toLowerCase();
        client.helpers.sendMessage(
          message.channelId,
          opts.createErrorMessage({
            error: `OPTIONS_INVALID_${type?.toUpperCase()}`,
            syntax,
            message: `The argument \`${optionName}\` must be a valid ${type}.`,
          }),
        );
        return;
      }
    }

    if (optionData.data.required && !value) {
      // Did not provide required argument
      client.helpers.sendMessage(
        message.channelId,
        opts.createErrorMessage({
          error: "OPTIONS_MISSING_ARGUMENT",
          syntax,
        }),
      );
      return;
    }

    return {
      data:
        value === undefined
          ? undefined
          : {
              name: camelToSnakeCase(optionName),
              type: optionData.data.type,
              value,
            },
    };
  }

  /**
   * Handle the application command
   * @param interaction The interaction
   * @param command The application command or subcommand
   * @returns
   */
  handleChatInputCommand({
    client,
    message,
    interaction,
    command,
    options,
  }: {
    client: B;
    message?: Message;
    interaction?: Interaction;
    command: ApplicationCommand<B> | ApplicationSubcommand<B>;
    options: InteractionDataOption[];
  }) {
    try {
      // Disallowing having both message and interaction
      if (message && interaction)
        throw new Error(
          "Cannot have both message and interaction in handleChatInputCommand",
        );

      // Handle command execution
      if (
        (message ||
          interaction?.type === InteractionTypes.ApplicationCommand) &&
        "execute" in command
      ) {
        return this.executeInteraction({
          client,
          interaction,
          message,
          execute: command.execute as CommandExecution<B>,
          options: options || [],
        });
      }

      // Handle autocomplete
      if (
        interaction?.type === InteractionTypes.ApplicationCommandAutocomplete &&
        "autocomplete" in command
      ) {
        return this.executeInteraction({
          client,
          interaction,
          execute: command.autocomplete as CommandExecution<B>,
          options: options || [],
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Executes the interaction
   * @param interaction The interaction
   * @param func The command execution function
   * @returns
   */
  executeInteraction({
    client,
    message,
    interaction,
    options,
    execute,
  }: {
    client: B;
    message?: Message;
    interaction?: Interaction;
    options?: InteractionDataOption[];
    execute: CommandExecution<B>;
  }) {
    // Disallowing having both message and interaction
    if (message && interaction)
      throw new Error(
        "Cannot have both message and interaction in executeInteraction",
      );

    if (typeof execute !== "function") return;

    execute({
      client,
      message,
      interaction,
      command: new CommandHandler({
        client,
        message,
        interaction,
      }),
      options: options || [],
    });
  }
}
