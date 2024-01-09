import { createIPCMessageEvent } from "@/ipc";

export default createIPCMessageEvent("getGuild", (client) => {
  return async ({ guildId, data, reply }) => {
    if (!guildId) return console.warn("Missing guild ID");

    console.log("Data from IPC:", data);

    return reply({
      guildId,
      cool: "message", // can also be "response" or "thing"
    });
  };
});
