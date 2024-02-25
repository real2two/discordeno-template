import { ApplicationSubcommand } from "../../utils/createFunctions";
import { ApplicationCommandOptions as opts } from "@/discordeno-helpers";

import { MessageComponentTypes, ButtonStyles } from "@discordeno/bot";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {
      testTest: opts.integer("fun integer").required(),
    },
  },
  execute({ interaction }) {
    const value = interaction.data?.options
      ?.find(({ name }) => name === "subcommand_name")
      ?.options?.find(({ name }) => name === "test_test")?.value;

    interaction.respond({
      content: `test ${value}`,
      components: [
        {
          type: MessageComponentTypes.ActionRow,
          components: [
            {
              type: MessageComponentTypes.Button,
              style: ButtonStyles.Primary,
              label: "press me",
              customId: "button",
            },
          ],
        },
      ],
    });
  },
});
