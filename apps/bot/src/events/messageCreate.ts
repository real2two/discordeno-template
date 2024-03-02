import { createEvent } from "../utils/createFunctions";
import { interactionHandler } from "../utils/interactionHandler";

export default createEvent("messageCreate", (client) => {
  return (message) => {
    interactionHandler.messageCreate(
      { client, message, prefix: "rpg!" },
      {
        createErrorMessage: ({ syntax, message }) => ({
          embeds: [
            {
              color: 0xed4245,
              author: {
                name: "Incorrect usage",
              },
              description: message,
              footer: {
                text: `The correct syntax is: ${syntax}`,
              }
            },
          ],
        }),
      },
    );
  };
});
