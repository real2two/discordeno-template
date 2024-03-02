import type { Bot } from "@discordeno/bot";
import type { ApplicationSubcommand } from "../structures";

export interface TransformedApplicationSubcommand<B extends Bot> {
  subcommand: ApplicationSubcommand<B>;
  syntax: string;
  subcommands: {
    [k: string]: TransformedApplicationSubcommand<B>;
  };
}
