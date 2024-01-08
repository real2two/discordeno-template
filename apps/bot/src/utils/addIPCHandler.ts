import type { ExtendedClient } from "@/discordeno-helpers";

/**
 * Add in IPC handlers to the client
 * @param client The extended client
 */
export function addIPCHandler(client: ExtendedClient) {
  // Added a "testing" cluster messaging system
  // TODO: Create an IPC handler by creating "src/handlers/ipc.ts" and an "ipc" folder

  client.cluster.on("message", (message) => {
    // This is some kind of IPC-like system for cross hosting.
    // You can remove this event handler if you aren't going to use the web process.

    if (typeof message !== "object" || "guildId" in message === false) return;

    const guildId = message.guildId as string;
    if (!guildId) return;

    message.reply({
      data: {
        guildId,
        cool: "response", // You can use this to communicate with the web process.
      },
    });
  });
}
