import { getIPCMessageEvent } from "@/discordeno-helpers";
import type { IPCMessageRequests } from "./types/IPCMessageRequests";
import type { IPCMessageResponses } from "./types/IPCMessageResponses";

export const createIPCMessageEvent = getIPCMessageEvent<
  IPCMessageRequests,
  IPCMessageResponses
>();
