import { Component } from "@/discordeno-helpers";

export default new Component({
  customId: "button", // In regex: /^button$/

  execute({ client, interaction }) {
    interaction.respond("test");
  },
});
