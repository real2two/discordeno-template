import {
  InteractionTypes,
  ApplicationCommandTypes,
  ApplicationCommandOptionTypes,
  MessageFlags,
  camelToSnakeCase,
  snakeToCamelCase,
  type Interaction,
  type InteractionDataOption,
} from "@discordeno/bot";

import { ApplicationSubcommand } from "./ApplicationSubcommand";
import { Component } from "./Component";

import type { ApplicationCommand } from "./ApplicationCommand";
import type {
  CommandExecution,
  TransformedApplicationCommand,
  ExtendedBot,
} from "../types";

export class InteractionHandler<B extends ExtendedBot> {
  client: B;
  commands: TransformedApplicationCommand<B>[];
  components: Component<B>[];

  static transformGetCommands<B extends ExtendedBot>(
    commands: ApplicationCommand<B>[],
  ) {
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

  static transformOptions(options: InteractionDataOption[]) {
    if (!options) return {};

    const variables: { [key: string]: string | number | boolean | undefined } =
      {};
    for (const option of options) {
      variables[snakeToCamelCase(option.name)] = option.value;
    }

    return variables;
  }

  constructor({
    client,
    commands,
    components,
  }: {
    client: B;
    commands: ApplicationCommand<B>[];
    components: Component<B>[];
  }) {
    this.client = client;
    this.commands = InteractionHandler.transformGetCommands(commands || []);
    this.components = components || [];
  }

  async interactionCreate(interaction: Interaction) {
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
            interaction.data?.type === c.search.type &&
            interaction.data?.name === c.search.name,
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
              return this.handleCommand(
                interaction,
                interaction.data.options[0].options || [],
                subcommandData.subcommand,
              );
            }
            case ApplicationCommandOptionTypes.SubCommandGroup: {
              // Handle subcommand group
              if (!subcommand.data.options) subcommand.data.options = {};
              if (!interaction.data.options[0].options) return;

              const subcommandInGroup =
                subcommandsInGroup[interaction.data.options[0].options[0].name];
              if (!subcommandInGroup) {
                return console.warn(
                  `Couldn't find subcommand in a subcommand group`,
                  interaction.data,
                );
              }

              return this.handleCommand(
                interaction,
                interaction.data.options[0].options[0].options || [],
                subcommandInGroup.subcommand,
              );
            }
          }
        }

        // Handle command
        return this.handleCommand(
          interaction,
          interaction.data.options || [],
          command,
        );
      }

      if (
        [
          InteractionTypes.MessageComponent,
          InteractionTypes.ModalSubmit,
        ].includes(interaction.type)
      ) {
        if (!interaction.data.customId) return;

        if (interaction.data.customId.startsWith("$")) {
          // Non-persistent message component handler
          if (!interaction.message?.id) return;

          const collector = this.client.collectors.components.get(
            interaction.message.id.toString(),
          );

          if (!collector) {
            return interaction.respond({
              content: "This interaction has expired.",
              flags: MessageFlags.Ephemeral,
            });
          }

          if (collector?.opts.events.collect) {
            collector.opts.events.collect(interaction);
          }

          return;
        } else {
          // Persistent message component handler
          for (const { customId, execute } of this.components) {
            if (
              typeof customId === "string"
                ? customId === interaction.data.customId
                : customId.test(interaction.data.customId)
            ) {
              execute({
                client: this.client,
                interaction,
              });
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  handleCommand(
    interaction: Interaction,
    options: InteractionDataOption[],
    command: ApplicationCommand<B> | ApplicationSubcommand<B>,
  ) {
    try {
      // Handle command execution
      if (
        interaction.type === InteractionTypes.ApplicationCommand &&
        "execute" in command
      ) {
        return this.executeInteraction(
          interaction,
          options,
          command.execute as CommandExecution<B>,
        );
      }

      // Handle autocomplete
      if (
        interaction.type === InteractionTypes.ApplicationCommandAutocomplete &&
        "autocomplete" in command
      ) {
        return this.executeInteraction(
          interaction,
          options,
          command.autocomplete as CommandExecution<B>,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  executeInteraction(
    interaction: Interaction,
    options: InteractionDataOption[],
    func: CommandExecution<B>,
  ) {
    if (typeof func !== "function") return;

    func({
      client: this.client,
      interaction,
      options: InteractionHandler.transformOptions(options),
    });
  }
}
