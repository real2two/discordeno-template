import help from "../commands/help";
import testCommand from "../commands/testCommand";

import type { ApplicationCommand } from "@/discordeno-helpers";

export const commands: ApplicationCommand[] = [help, testCommand];
