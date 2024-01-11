import { createIPCMessageEvent } from "@/discordeno-helpers";

import type { Bot } from "@discordeno/bot";
import type { IPCMessageRequests } from "./types/IPCMessageRequests";
import type { IPCMessageResponses } from "./types/IPCMessageResponses";

/**
 * Get the IPC message event
 * @returns The IPC message event
 */
export function getIPCMessageEvent<B extends Bot>() {
  return createIPCMessageEvent<B, IPCMessageRequests, IPCMessageResponses>();
}
