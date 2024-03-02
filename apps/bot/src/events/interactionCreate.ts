import { createEvent } from "../utils/createFunctions";
import { interactionHandler } from "../utils/interactionHandler";

export default createEvent("interactionCreate", (client) => {
  return (interaction) => {
    interactionHandler.interactionCreate({ client, interaction });
  };
});
