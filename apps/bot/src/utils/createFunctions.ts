import {
  ApplicationCommand as RawApplicationCommand,
  ApplicationSubcommand as RawApplicationSubcommand,
  Component as RawComponent,
  createEventHandler,
} from "@/discordeno-helpers";

import { getIPCMessageEvent } from "@/ipc";

import type { client } from "../main/bot";

export const ApplicationCommand = RawApplicationCommand<typeof client>;
export const ApplicationSubcommand = RawApplicationSubcommand<typeof client>;

export const Component = RawComponent<typeof client>;

export const createEvent = createEventHandler<typeof client>();
export const createIPCMessageEvent = getIPCMessageEvent<typeof client>();
