import type { ApplicationSubcommand } from "../structures";
import { ExtendedBot } from "./ExtendedBot";

export interface TransformedApplicationSubcommand<B extends ExtendedBot> {
  subcommand: ApplicationSubcommand<B>;
  subcommands: {
    [k: string]: TransformedApplicationSubcommand<B>;
  };
}
