export default {
  customId: "button", // In regex: /^button$/

  /** @param {import("../../types/commands").ExtendedInteractionExecution} */
  execute({ client, interaction }) {
    interaction.respond("test");
  },
};
