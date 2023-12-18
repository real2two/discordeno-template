import {
  ApplicationSubcommand,
  ApplicationCommandOptions as opts,
} from "@/discordeno-helpers";

import { MessageComponentTypes, ButtonStyles } from "@discordeno/bot";

export default new ApplicationSubcommand({
  data: {
    description: "this is a subcmomand.",
    options: {
      testTest: opts.integer("fun integer").required(),
    },
  },
  /** @param {import("../../../types/commands").ExtendedCommandExecution} */
  execute({ client, interaction, options }) {
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
