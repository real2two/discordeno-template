import type {
  Camelize,
  DiscordApplicationCommandOption,
} from "@discordeno/bot";

import type { ApplicationCommandOptionsList, ExtendedBot } from "./";

export interface ApplicationSubcommandConstructor<B extends ExtendedBot>
  extends Partial<Omit<Camelize<DiscordApplicationCommandOption>, "options">> {
  description: string;
  options?: ApplicationCommandOptionsList<B>;
}
