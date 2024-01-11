import { IPCMessageClient } from "@/discordeno-helpers";

import type { Client } from "discord-cross-hosting";

import type { IPCMessageRequests } from "./types/IPCMessageRequests";
import type { IPCMessageResponses } from "./types/IPCMessageResponses";

/**
 * Get the IPC message client
 * @param client The client
 * @returns The IPC message client
 */
export function getIPCMessageClient(client: Client) {
  return new IPCMessageClient<IPCMessageRequests, IPCMessageResponses>(client);
}
