import type { ApplicationCommandOptions as ApplicationCommandOptions } from "../structures/ApplicationCommandOptions";
import type { ApplicationSubcommand } from "../structures/ApplicationSubcommand";

export interface ApplicationCommandOptionsList {
  [key: string]: ApplicationCommandOptions | ApplicationSubcommand;
}
