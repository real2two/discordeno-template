import { createEvent } from "../utils/createFunctions";
import { interactionHandler } from "../utils/interactionHandler";

export default createEvent("messageCreate", (client) => {
  return (message) => {
    interactionHandler.messageCreate({ client, message, prefix: "rpg!" });
  };
});
