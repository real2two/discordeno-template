import type { CreateContextApplicationCommand } from "@discordeno/bot";

export interface ApplicationCommandContextConstructor
  extends Partial<CreateContextApplicationCommand> {
  name: string;
  description: string;
}
