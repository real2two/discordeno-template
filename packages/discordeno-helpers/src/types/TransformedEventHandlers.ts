import type { EventHandlers } from "@discordeno/bot";
import type { ExtendedClient } from "./ExtendedBot";

export interface TransformedEventHandlers {
  debug: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["debug"]>) => unknown;
  };
  applicationCommandPermissionsUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["applicationCommandPermissionsUpdate"]>
    ) => unknown;
  };
  guildAuditLogEntryCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildAuditLogEntryCreate"]>
    ) => unknown;
  };
  automodRuleCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["automodRuleCreate"]>
    ) => unknown;
  };
  automodRuleUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["automodRuleUpdate"]>
    ) => unknown;
  };
  automodRuleDelete: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["automodRuleDelete"]>
    ) => unknown;
  };
  automodActionExecution: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["automodActionExecution"]>
    ) => unknown;
  };
  threadCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadCreate"]>) => unknown;
  };
  threadDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadDelete"]>) => unknown;
  };
  threadListSync: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadListSync"]>) => unknown;
  };
  threadMemberUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["threadMemberUpdate"]>
    ) => unknown;
  };
  threadMembersUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["threadMembersUpdate"]>
    ) => unknown;
  };
  threadUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadUpdate"]>) => unknown;
  };
  scheduledEventCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventCreate"]>
    ) => unknown;
  };
  scheduledEventUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventUpdate"]>
    ) => unknown;
  };
  scheduledEventDelete: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventDelete"]>
    ) => unknown;
  };
  scheduledEventUserAdd: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventUserAdd"]>
    ) => unknown;
  };
  scheduledEventUserRemove: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventUserRemove"]>
    ) => unknown;
  };
  ready: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["ready"]>) => unknown;
  };
  interactionCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["interactionCreate"]>
    ) => unknown;
  };
  integrationCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["integrationCreate"]>
    ) => unknown;
  };
  integrationDelete: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["integrationDelete"]>
    ) => unknown;
  };
  integrationUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["integrationUpdate"]>
    ) => unknown;
  };
  inviteCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["inviteCreate"]>) => unknown;
  };
  inviteDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["inviteDelete"]>) => unknown;
  };
  guildMemberAdd: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildMemberAdd"]>) => unknown;
  };
  guildMemberRemove: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildMemberRemove"]>
    ) => unknown;
  };
  guildMemberUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildMemberUpdate"]>
    ) => unknown;
  };
  guildStickersUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildStickersUpdate"]>
    ) => unknown;
  };
  messageCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["messageCreate"]>) => unknown;
  };
  messageDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["messageDelete"]>) => unknown;
  };
  messageDeleteBulk: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["messageDeleteBulk"]>
    ) => unknown;
  };
  messageUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["messageUpdate"]>) => unknown;
  };
  reactionAdd: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["reactionAdd"]>) => unknown;
  };
  reactionRemove: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["reactionRemove"]>) => unknown;
  };
  reactionRemoveEmoji: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["reactionRemoveEmoji"]>
    ) => unknown;
  };
  reactionRemoveAll: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["reactionRemoveAll"]>
    ) => unknown;
  };
  presenceUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["presenceUpdate"]>) => unknown;
  };
  voiceServerUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["voiceServerUpdate"]>
    ) => unknown;
  };
  voiceStateUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["voiceStateUpdate"]>
    ) => unknown;
  };
  channelCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["channelCreate"]>) => unknown;
  };
  dispatchRequirements: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["dispatchRequirements"]>
    ) => unknown;
  };
  channelDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["channelDelete"]>) => unknown;
  };
  channelPinsUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["channelPinsUpdate"]>
    ) => unknown;
  };
  channelUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["channelUpdate"]>) => unknown;
  };
  stageInstanceCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["stageInstanceCreate"]>
    ) => unknown;
  };
  stageInstanceDelete: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["stageInstanceDelete"]>
    ) => unknown;
  };
  stageInstanceUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["stageInstanceUpdate"]>
    ) => unknown;
  };
  guildEmojisUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildEmojisUpdate"]>
    ) => unknown;
  };
  guildBanAdd: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildBanAdd"]>) => unknown;
  };
  guildBanRemove: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildBanRemove"]>) => unknown;
  };
  guildCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildCreate"]>) => unknown;
  };
  guildDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildDelete"]>) => unknown;
  };
  guildUnavailable: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildUnavailable"]>
    ) => unknown;
  };
  guildUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildUpdate"]>) => unknown;
  };
  raw: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["raw"]>) => unknown;
  };
  roleCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["roleCreate"]>) => unknown;
  };
  roleDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["roleDelete"]>) => unknown;
  };
  roleUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["roleUpdate"]>) => unknown;
  };
  webhooksUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["webhooksUpdate"]>) => unknown;
  };
  botUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["botUpdate"]>) => unknown;
  };
  typingStart: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["typingStart"]>) => unknown;
  };
  entitlementCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["entitlementCreate"]>
    ) => unknown;
  };
  entitlementUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["entitlementUpdate"]>
    ) => unknown;
  };
  entitlementDelete: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["entitlementDelete"]>
    ) => unknown;
  };
}
