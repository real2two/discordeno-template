import type {
  ApplicationCommandOptions as ApplicationCommandOptions,
  ApplicationSubcommand,
} from "../structures";
import type { Bot } from "@discordeno/bot";

export interface ApplicationCommandOptionsList<B extends Bot> {
  [key: string]: ApplicationCommandOptions | ApplicationSubcommand<B>;
}
