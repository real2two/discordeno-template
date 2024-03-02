import { createEvent } from "../utils/createFunctions";
import { interactionHandler } from "../utils/interactionHandler";

export default createEvent("messageCreate", (client) => {
  return (message) => {
    interactionHandler.messageCreate(
      { client, message, prefix: "!" },
      {
        createErrorMessage: ({ syntax, message }) => ({
          embeds: [
            {
              color: 0xed4245,
              author: {
                name: "Incorrect usage",
              },
              description: message || `The correct syntax is: \`!${syntax}\`.`,
              footer: message ? {
                text: `The correct syntax is: !${syntax}`,
              } : undefined,
            },
          ],
        }),
      },
    );
  };
});
