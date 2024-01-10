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
  execute({ interaction, options }) {
    console.log(options);
    interaction.respond({
      content: `test ${options.testTest}`,
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
