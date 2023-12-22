import {
  InteractionTypes,
  ApplicationCommandTypes,
  MessageFlags,
  camelToSnakeCase,
  snakeToCamelCase,
  type Interaction,
  type InteractionDataOption,
} from "@discordeno/bot";
import { ApplicationSubcommand } from "./ApplicationSubcommand";

import type { ApplicationCommand } from "./ApplicationCommand";
import type {
  CommandExecution,
  Component,
  ExtendedClient,
  TransformedApplicationCommand,
} from "../types";

export class InteractionHandler {
  client: ExtendedClient;
  commands: TransformedApplicationCommand[];
  components: Component[];

  static transformGetCommands(commands: ApplicationCommand[]) {
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
          .map(([k, v]) => [camelToSnakeCase(k), v]),
      ),
    })) as TransformedApplicationCommand[];
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
    client: ExtendedClient;
    commands: ApplicationCommand[];
    components: Component[];
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

        const commandData = this.getCommand(
          interaction.data.type,
          interaction.data.name,
        );
        if (!commandData) {
          return console.warn("Couldn't find command", interaction.data);
        }

        const { command, subcommands } = commandData;

        if (
          interaction.data?.options &&
          interaction.data.options.length === 1 &&
          interaction.data.options[0].type === 1
        ) {
          // Handle subcommand
          const subcommand = subcommands[interaction.data.options[0].name];
          if (!subcommand) {
            return console.warn(`Couldn't find subcommand`, interaction.data);
          }

          return this.handleCommand(
            interaction,
            interaction.data.options[0].options || [],
            subcommand,
          );
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

  getCommand(commandType: ApplicationCommandTypes, commandName: string) {
    const command = this.commands.find(
      (c) => commandType === c.search.type && commandName === c.search.name,
    );
    if (!command) return null;

    return {
      command: command.command,
      subcommands: command.subcommands,
    };
  }

  handleCommand(
    interaction: Interaction,
    options: InteractionDataOption[],
    command: ApplicationCommand | ApplicationSubcommand,
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
          command.execute as CommandExecution,
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
          command.autocomplete as CommandExecution,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  executeInteraction(
    interaction: Interaction,
    options: InteractionDataOption[],
    func: CommandExecution,
  ) {
    if (typeof func !== "function") return;

    func({
      client: this.client,
      interaction,
      options: InteractionHandler.transformOptions(options),
    });
  }
}
