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
      subcommands: Object.fromEntries(
        Object.entries(
          ("options" in command.data ? command.data["options"] : {}) || {},
        )
          .filter(([_, v]) => v instanceof ApplicationSubcommand)
          .map(([k, v]) => [
            camelToSnakeCase(k),
            {
              subcommand: v,
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
   * Handle the application command
   * @param interaction The interaction
   * @param command The application command or subcommand
   * @returns
   */
  handleChatInputCommand({
    client,
    interaction,
    command,
    options,
  }: {
    client: B;
    interaction?: Interaction;
    command: ApplicationCommand<B> | ApplicationSubcommand<B>;
    options: InteractionDataOption[];
  }) {
    try {
      // Handle command execution
      if (
        (
          interaction?.type === InteractionTypes.ApplicationCommand) &&
        "execute" in command
      ) {
        return this.executeInteraction({
          client,
          interaction,
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
    interaction,
    options,
    execute,
  }: {
    client: B;
    interaction?: Interaction;
    options?: InteractionDataOption[];
    execute: CommandExecution<B>;
  }) {
    if (typeof execute !== "function") return;

    execute({
      client,
      interaction,
      options: options || [],
    });
  }
}
