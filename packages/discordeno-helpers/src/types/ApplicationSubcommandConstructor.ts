import type {
  Bot,
  Camelize,
  DiscordApplicationCommandOption,
} from "@discordeno/bot";

import type { ApplicationCommandOptionsList } from "./";

export interface ApplicationSubcommandConstructor<B extends Bot>
  extends Partial<Omit<Camelize<DiscordApplicationCommandOption>, "options">> {
  description: string;
  options?: ApplicationCommandOptionsList<B>;
}
