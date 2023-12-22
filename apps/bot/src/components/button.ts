import { InteractionExecutionArguments } from "@/discordeno-helpers";

export default {
  customId: "button", // In regex: /^button$/

  execute({ client, interaction }: InteractionExecutionArguments) {
    interaction.respond("test");
  },
};
