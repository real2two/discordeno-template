import type { CreateSlashApplicationCommand } from "@discordeno/bot";
import type { ApplicationCommandOptionsList } from "./ApplicationCommandOptionsList";
import type { Omit } from "./Omit";

export interface ApplicationCommandSlashCommandConstructor
  extends Partial<Omit<CreateSlashApplicationCommand, "options">> {
  name: string;
  description: string;
  options?: ApplicationCommandOptionsList;
}
