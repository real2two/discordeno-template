import {
  InteractionTypes,
  ApplicationCommandTypes,
  MessageFlags,
  camelToSnakeCase,
  snakeToCamelCase,
} from "@discordeno/bot";
import { ApplicationSubcommand } from "./ApplicationSubcommand.ts";

export class InteractionHandler {
  static transformGetCommands(commands) {
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
        Object.entries(command.data.options)
          .filter(([_, v]) => v instanceof ApplicationSubcommand)
          .map(([k, v]) => [camelToSnakeCase(k), v]),
      ),
    }));
  }

  static transformOptions(options) {
    if (!options) return {};

    const variables = {};
    for (const option of options) {
      variables[snakeToCamelCase(option.name)] = option.value;
    }

    return variables;
  }

  /**
   *
   * @param {{
   *  client: import("@discordeno/bot").Bot,
   *  commands: import("./ApplicationCommand.ts")[],
   * }}
   */
  constructor({ client, commands, components }) {
    this.client = client;
    this.commands = commands
      ? InteractionHandler.transformGetCommands(commands)
      : [];
    this.components = components || [];
  }

  /**
   *
   * @param {import("@discordeno/bot").Interaction} interaction
   */
  async interactionCreate(interaction) {
    try {
      if (
        [
          InteractionTypes.ApplicationCommand,
          InteractionTypes.ApplicationCommandAutocomplete,
        ].includes(interaction.type)
      ) {
        // Handle command
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
            interaction.data.options[0].options,
            subcommand,
          );
        }

        // Handle command
        return this.handleCommand(
          interaction,
          interaction.data.options,
          command,
        );
      }

      if (
        [
          InteractionTypes.MessageComponent,
          InteractionTypes.ModalSubmit,
        ].includes(interaction.type)
      ) {
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

  /**
   *
   * @param {import("@discordeno/bot").ApplicationCommandTypes} commandType
   * @param {string} commandName
   * @returns
   */
  getCommand(commandType, commandName) {
    const command = this.commands.find(
      (c) => commandType === c.search.type && commandName === c.search.name,
    );
    if (!command) return null;

    return {
      command: command.command,
      subcommands: command.subcommands,
    };
  }

  handleCommand(interaction, options, command) {
    try {
      // Handle command execution
      if (
        interaction.type === InteractionTypes.ApplicationCommand &&
        "execute" in command
      ) {
        return this.executeInteraction(interaction, options, command.execute);
      }

      // Handle autocomplete
      if (
        interaction.type === InteractionTypes.ApplicationCommandAutocomplete &&
        "autocomplete" in command
      ) {
        return this.executeInteraction(
          interaction,
          options,
          command.autocomplete,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  executeInteraction(interaction, options, func) {
    if (typeof func !== "function") return;

    func({
      client: this.client,
      interaction,
      options: InteractionHandler.transformOptions(options),
    });
  }
}
