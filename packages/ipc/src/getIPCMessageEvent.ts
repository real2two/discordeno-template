import { createIPCMessageEvent } from "@/discordeno-helpers";

import type { Bot } from "@discordeno/bot";
import type { IPCMessageRequests } from "./types/IPCMessageRequests";
import type { IPCMessageResponses } from "./types/IPCMessageResponses";

export function getIPCMessageEvent<B extends Bot>() {
  return createIPCMessageEvent<B, IPCMessageRequests, IPCMessageResponses>();
}
