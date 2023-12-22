import { ApplicationCommand } from "../structures/ApplicationCommand";
import { ApplicationSubcommand } from "../structures/ApplicationSubcommand";

export interface TransformedApplicationCommand {
  search: { type: any; name: any };
  command: ApplicationCommand;
  subcommands: { [k: string]: ApplicationSubcommand };
}
