import { Component } from "../utils/createFunctions";

export default new Component({
  customId: "button", // In regex: /^button$/

  execute({ client, interaction }) {
    interaction.respond("test");
  },
});
