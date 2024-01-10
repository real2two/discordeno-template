import type {
  ApplicationCommandOptions as ApplicationCommandOptions,
  ApplicationSubcommand,
} from "../structures";
import type { ExtendedBot } from "./";

export interface ApplicationCommandOptionsList<B extends ExtendedBot> {
  [key: string]: ApplicationCommandOptions | ApplicationSubcommand<B>;
}
