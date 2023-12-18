import type { Bot, Interaction } from "@discordeno/bot";

export interface InteractionExecution {
  client: Bot;
  interaction: Interaction;
}

export interface CommandExecution extends InteractionExecution {
  options: {
    [key: string]: string | number;
  };
}
