import help from "../commands/help.js";
import testCommand from "../commands/testCommand.js";

/** @type Partial<import("@/discordeno-helpers").ApplicationCommand>[] */
export const commands = [help, testCommand];
