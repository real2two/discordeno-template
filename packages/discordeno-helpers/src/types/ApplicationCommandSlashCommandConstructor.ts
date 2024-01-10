import type { CreateSlashApplicationCommand } from "@discordeno/bot";
import type { ApplicationCommandOptionsList, ExtendedBot, Omit } from "./";

export interface ApplicationCommandSlashCommandConstructor<
  B extends ExtendedBot,
> extends Partial<Omit<CreateSlashApplicationCommand, "options">> {
  name: string;
  description: string;
  options?: ApplicationCommandOptionsList<B>;
}
