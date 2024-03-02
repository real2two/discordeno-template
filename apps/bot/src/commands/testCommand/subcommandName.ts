import { ApplicationSubcommand } from "../../utils/createFunctions";
import { ApplicationCommandOptions as opts } from "@/discordeno-helpers";

import {
  MessageComponentTypes,
  ButtonStyles,
  type CreateMessageOptions,
} from "@discordeno/bot";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {
      testTest: opts.integer("fun integer").required(),
    },
  },
  execute({ client, message, interaction, options }) {
    const value = options.find(({ name }) => name === "test_test")?.value;
    console.log(options);

    const data = {
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
    } as CreateMessageOptions;

    if (interaction) {
      interaction.respond(data);
    } else if (message) {
      client.helpers.sendMessage(message.channelId, data);
    }
  },
});
