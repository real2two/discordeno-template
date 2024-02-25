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
    console.log(
      interaction.data?.options
        ?.find(({ name }) => name === "subcommand_name")
        ?.options?.find(({ name }) => name === "test_test"),
    );
    interaction.respond({
      content: `test`,
      components: [
        {
          type: MessageComponentTypes.ActionRow,
          components: [
            {
              type: MessageComponentTypes.Button,
              style: ButtonStyles.Primary,
              label: "this is a persistent button",
              customId: "button",
            },
          ],
        },
      ],
    });
  },
});
