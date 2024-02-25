import type { CreateSlashApplicationCommand, Bot } from "@discordeno/bot";
import type { ApplicationCommandOptionsList, Omit } from "./";

export interface ApplicationCommandSlashCommandConstructor<B extends Bot>
  extends Partial<Omit<CreateSlashApplicationCommand, "options">> {
  name: string;
  description: string;
  options?: ApplicationCommandOptionsList<B>;
}
