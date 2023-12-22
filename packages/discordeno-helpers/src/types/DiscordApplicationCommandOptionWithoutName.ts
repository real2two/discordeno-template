import type {
  Camelize,
  DiscordApplicationCommandOption,
} from "@discordeno/bot";

export type DiscordApplicationCommandOptionWithoutName = Omit<
  Camelize<DiscordApplicationCommandOption>,
  "name"
>;
