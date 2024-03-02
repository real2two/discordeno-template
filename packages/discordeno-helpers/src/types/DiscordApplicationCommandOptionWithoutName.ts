import type {
  Camelize,
  DiscordApplicationCommandOption,
  DiscordApplicationCommandOptionChoice,
} from "@discordeno/bot";

export type DiscordApplicationCommandOptionWithoutName = Omit<
  Camelize<DiscordApplicationCommandOption>,
  "name"
>;
