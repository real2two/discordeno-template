import type { ClusteredBot } from "../types";
import type { createIPCMessageEvent } from "./createIPCMessageEvent";

/**
 * Add IPC message handler to the client
 * @param client The extended client
 */
export function addIPCMessageHandler<B extends ClusteredBot>(
  client: B,
  ipcs: ReturnType<ReturnType<typeof createIPCMessageEvent>>[],
) {
  const ipcHandlers: {
    [name: string]: ReturnType<(typeof ipcs)[0]["execute"]>;
  } = {};
  for (const ipc of ipcs) {
    ipcHandlers[ipc.name] = ipc.execute(client);
  }

  // This is some kind of IPC-like system from cross hosting.
  client.cluster.on("message", async (payload) => {
    try {
      if (
        typeof payload !== "object" ||
        Array.isArray(payload) ||
        payload === null
      )
        return console.warn(
          "IPC payload must be an object that isn't an array",
          payload,
        );

      if ("event" in payload === false || typeof payload.event !== "string")
        return console.warn("IPC payload event must be a string", payload);

      await ipcHandlers[payload.event]({
        guildId: payload.guildId, // (optional)
        data: payload.data,
        reply: (data: any) => payload.reply({ success: true, data }),
      });
    } catch (err) {
      console.error(err);
    }
  });
}
