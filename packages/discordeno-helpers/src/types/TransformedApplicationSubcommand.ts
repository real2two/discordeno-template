import type { ApplicationSubcommand } from "../structures/ApplicationSubcommand";

export interface TransformedApplicationSubcommand {
  subcommand: ApplicationSubcommand;
  subcommands: {
    [k: string]: TransformedApplicationSubcommand;
  };
}
