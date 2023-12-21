import help from "../commands/help.ts";
import testCommand from "../commands/testCommand.ts";

/** @type Partial<import("@/discordeno-helpers").ApplicationCommand>[] */
export const commands = [help, testCommand];
