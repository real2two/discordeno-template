import type { ApplicationCommandTypes, Bot } from "@discordeno/bot";
import type { ApplicationCommand } from "../structures";
import type { TransformedApplicationSubcommand } from "./";

export interface TransformedApplicationCommand<B extends Bot> {
  search: { type: ApplicationCommandTypes; name: string };
  command: ApplicationCommand<B>;
  syntax: string;
  subcommands: {
    [k: string]: TransformedApplicationSubcommand<B>;
  };
}
