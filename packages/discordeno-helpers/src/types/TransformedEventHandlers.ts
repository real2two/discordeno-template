import type { EventHandlers } from "@discordeno/bot";
import type { ExtendedClient } from "./ExtendedBot";

export interface TransformedEventHandlers {
  debug: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["debug"]>) => void;
  };
  applicationCommandPermissionsUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["applicationCommandPermissionsUpdate"]>
    ) => void;
  };
  guildAuditLogEntryCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildAuditLogEntryCreate"]>
    ) => void;
  };
  automodRuleCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["automodRuleCreate"]>) => void;
  };
  automodRuleUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["automodRuleUpdate"]>) => void;
  };
  automodRuleDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["automodRuleDelete"]>) => void;
  };
  automodActionExecution: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["automodActionExecution"]>
    ) => void;
  };
  threadCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadCreate"]>) => void;
  };
  threadDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadDelete"]>) => void;
  };
  threadListSync: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadListSync"]>) => void;
  };
  threadMemberUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadMemberUpdate"]>) => void;
  };
  threadMembersUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["threadMembersUpdate"]>
    ) => void;
  };
  threadUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["threadUpdate"]>) => void;
  };
  scheduledEventCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventCreate"]>
    ) => void;
  };
  scheduledEventUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventUpdate"]>
    ) => void;
  };
  scheduledEventDelete: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventDelete"]>
    ) => void;
  };
  scheduledEventUserAdd: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventUserAdd"]>
    ) => void;
  };
  scheduledEventUserRemove: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["scheduledEventUserRemove"]>
    ) => void;
  };
  ready: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["ready"]>) => void;
  };
  interactionCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["interactionCreate"]>) => void;
  };
  integrationCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["integrationCreate"]>) => void;
  };
  integrationDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["integrationDelete"]>) => void;
  };
  integrationUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["integrationUpdate"]>) => void;
  };
  inviteCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["inviteCreate"]>) => void;
  };
  inviteDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["inviteDelete"]>) => void;
  };
  guildMemberAdd: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildMemberAdd"]>) => void;
  };
  guildMemberRemove: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildMemberRemove"]>) => void;
  };
  guildMemberUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildMemberUpdate"]>) => void;
  };
  guildStickersUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["guildStickersUpdate"]>
    ) => void;
  };
  messageCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["messageCreate"]>) => void;
  };
  messageDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["messageDelete"]>) => void;
  };
  messageDeleteBulk: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["messageDeleteBulk"]>) => void;
  };
  messageUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["messageUpdate"]>) => void;
  };
  reactionAdd: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["reactionAdd"]>) => void;
  };
  reactionRemove: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["reactionRemove"]>) => void;
  };
  reactionRemoveEmoji: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["reactionRemoveEmoji"]>
    ) => void;
  };
  reactionRemoveAll: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["reactionRemoveAll"]>) => void;
  };
  presenceUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["presenceUpdate"]>) => void;
  };
  voiceServerUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["voiceServerUpdate"]>) => void;
  };
  voiceStateUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["voiceStateUpdate"]>) => void;
  };
  channelCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["channelCreate"]>) => void;
  };
  dispatchRequirements: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["dispatchRequirements"]>
    ) => void;
  };
  channelDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["channelDelete"]>) => void;
  };
  channelPinsUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["channelPinsUpdate"]>) => void;
  };
  channelUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["channelUpdate"]>) => void;
  };
  stageInstanceCreate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["stageInstanceCreate"]>
    ) => void;
  };
  stageInstanceDelete: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["stageInstanceDelete"]>
    ) => void;
  };
  stageInstanceUpdate: (client: ExtendedClient) => {
    execute: (
      ...data: Parameters<EventHandlers["stageInstanceUpdate"]>
    ) => void;
  };
  guildEmojisUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildEmojisUpdate"]>) => void;
  };
  guildBanAdd: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildBanAdd"]>) => void;
  };
  guildBanRemove: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildBanRemove"]>) => void;
  };
  guildCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildCreate"]>) => void;
  };
  guildDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildDelete"]>) => void;
  };
  guildUnavailable: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildUnavailable"]>) => void;
  };
  guildUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["guildUpdate"]>) => void;
  };
  raw: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["raw"]>) => void;
  };
  roleCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["roleCreate"]>) => void;
  };
  roleDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["roleDelete"]>) => void;
  };
  roleUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["roleUpdate"]>) => void;
  };
  webhooksUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["webhooksUpdate"]>) => void;
  };
  botUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["botUpdate"]>) => void;
  };
  typingStart: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["typingStart"]>) => void;
  };
  entitlementCreate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["entitlementCreate"]>) => void;
  };
  entitlementUpdate: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["entitlementUpdate"]>) => void;
  };
  entitlementDelete: (client: ExtendedClient) => {
    execute: (...data: Parameters<EventHandlers["entitlementDelete"]>) => void;
  };
}
