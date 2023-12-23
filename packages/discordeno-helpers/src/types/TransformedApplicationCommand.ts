import type { ApplicationCommandTypes } from "@discordeno/bot";
import type { ApplicationCommand } from "../structures/ApplicationCommand";
import type { TransformedApplicationSubcommand } from "./TransformedApplicationSubcommand";

export interface TransformedApplicationCommand {
  search: { type: ApplicationCommandTypes; name: string };
  command: ApplicationCommand;
  subcommands: {
    [k: string]: TransformedApplicationSubcommand;
  };
}
