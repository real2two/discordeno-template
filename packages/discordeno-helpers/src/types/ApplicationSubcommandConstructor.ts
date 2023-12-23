import type {
  Camelize,
  DiscordApplicationCommandOption,
} from "@discordeno/bot";

import type { ApplicationCommandOptionsList } from "./ApplicationCommandOptionsList";

export interface ApplicationSubcommandConstructor
  extends Partial<Omit<Camelize<DiscordApplicationCommandOption>, "options">> {
  description: string;
  options?: ApplicationCommandOptionsList;
}
