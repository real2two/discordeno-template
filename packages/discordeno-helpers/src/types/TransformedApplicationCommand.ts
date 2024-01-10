import type { ApplicationCommandTypes } from "@discordeno/bot";
import type { ApplicationCommand } from "../structures";
import type { ExtendedBot, TransformedApplicationSubcommand } from "./";

export interface TransformedApplicationCommand<B extends ExtendedBot> {
  search: { type: ApplicationCommandTypes; name: string };
  command: ApplicationCommand<B>;
  subcommands: {
    [k: string]: TransformedApplicationSubcommand<B>;
  };
}
