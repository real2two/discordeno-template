import type { Bot } from "@discordeno/bot";

/**
 * Add the desired property transformers for a Discordeno client.
 */
export function addDesiredProperties(client: Bot) {
  // client.transformers.desiredProperties.attachment.contentType = true;
  // client.transformers.desiredProperties.attachment.description = true;
  // client.transformers.desiredProperties.attachment.ephemeral = true;
  // client.transformers.desiredProperties.attachment.filename = true;
  // client.transformers.desiredProperties.attachment.height = true;
  // client.transformers.desiredProperties.attachment.id = true;
  // client.transformers.desiredProperties.attachment.proxyUrl = true;
  // client.transformers.desiredProperties.attachment.size = true;
  // client.transformers.desiredProperties.attachment.url = true;
  // client.transformers.desiredProperties.attachment.width = true;
  // client.transformers.desiredProperties.channel.applicationId = true;
  // client.transformers.desiredProperties.channel.archiveTimestamp = true;
  // client.transformers.desiredProperties.channel.archived = true;
  // client.transformers.desiredProperties.channel.autoArchiveDuration = true;
  // client.transformers.desiredProperties.channel.bitrate = true;
  // client.transformers.desiredProperties.channel.botIsMember = true;
  // client.transformers.desiredProperties.channel.createTimestamp = true;
  // client.transformers.desiredProperties.channel.flags = true;
  client.transformers.desiredProperties.channel.guildId = true;
  client.transformers.desiredProperties.channel.id = true;
  // client.transformers.desiredProperties.channel.invitable = true;
  // client.transformers.desiredProperties.channel.lastMessageId = true;
  // client.transformers.desiredProperties.channel.lastPinTimestamp = true;
  // client.transformers.desiredProperties.channel.locked = true;
  // client.transformers.desiredProperties.channel.managed = true;
  // client.transformers.desiredProperties.channel.memberCount = true;
  // client.transformers.desiredProperties.channel.messageCount = true;
  client.transformers.desiredProperties.channel.name = true;
  // client.transformers.desiredProperties.channel.newlyCreated = true;
  // client.transformers.desiredProperties.channel.nsfw = true;
  // client.transformers.desiredProperties.channel.ownerId = true;
  // client.transformers.desiredProperties.channel.parentId = true;
  // client.transformers.desiredProperties.channel.permissionOverwrites = true;
  // client.transformers.desiredProperties.channel.permissions = true;
  // client.transformers.desiredProperties.channel.position = true;
  // client.transformers.desiredProperties.channel.rateLimitPerUser = true;
  // client.transformers.desiredProperties.channel.rtcRegion = true;
  // client.transformers.desiredProperties.channel.topic = true;
  // client.transformers.desiredProperties.channel.type = true;
  // client.transformers.desiredProperties.channel.userLimit = true;
  // client.transformers.desiredProperties.channel.videoQualityMode = true;
  // client.transformers.desiredProperties.emoji.id = true;
  // client.transformers.desiredProperties.emoji.name = true;
  // client.transformers.desiredProperties.emoji.roles = true;
  // client.transformers.desiredProperties.emoji.user = true;
  // client.transformers.desiredProperties.guild.afkChannelId = true;
  // client.transformers.desiredProperties.guild.afkTimeout = true;
  // client.transformers.desiredProperties.guild.applicationId = true;
  // client.transformers.desiredProperties.guild.approximateMemberCount = true;
  // client.transformers.desiredProperties.guild.approximatePresenceCount = true;
  // client.transformers.desiredProperties.guild.banner = true;
  client.transformers.desiredProperties.guild.channels = true;
  // client.transformers.desiredProperties.guild.defaultMessageNotifications = true;
  // client.transformers.desiredProperties.guild.description = true;
  // client.transformers.desiredProperties.guild.discoverySplash = true;
  // client.transformers.desiredProperties.guild.explicitContentFilter = true;
  client.transformers.desiredProperties.guild.icon = true;
  client.transformers.desiredProperties.guild.id = true;
  // client.transformers.desiredProperties.guild.joinedAt = true;
  // client.transformers.desiredProperties.guild.maxMembers = true;
  // client.transformers.desiredProperties.guild.maxPresences = true;
  // client.transformers.desiredProperties.guild.maxVideoChannelUsers = true;
  // client.transformers.desiredProperties.guild.memberCount = true;
  // client.transformers.desiredProperties.guild.members = true;
  // client.transformers.desiredProperties.guild.mfaLevel = true;
  client.transformers.desiredProperties.guild.name = true;
  // client.transformers.desiredProperties.guild.nsfwLevel = true;
  client.transformers.desiredProperties.guild.ownerId = true;
  // client.transformers.desiredProperties.guild.permissions = true;
  // client.transformers.desiredProperties.guild.preferredLocale = true;
  // client.transformers.desiredProperties.guild.premiumProgressBarEnabled = true;
  // client.transformers.desiredProperties.guild.premiumSubscriptionCount = true;
  // client.transformers.desiredProperties.guild.premiumTier = true;
  // client.transformers.desiredProperties.guild.publicUpdatesChannelId = true;
  client.transformers.desiredProperties.guild.roles = true;
  // client.transformers.desiredProperties.guild.rulesChannelId = true;
  // client.transformers.desiredProperties.guild.shardId = true;
  // client.transformers.desiredProperties.guild.splash = true;
  // client.transformers.desiredProperties.guild.stageInstances = true;
  // client.transformers.desiredProperties.guild.systemChannelFlags = true;
  // client.transformers.desiredProperties.guild.systemChannelId = true;
  // client.transformers.desiredProperties.guild.vanityUrlCode = true;
  // client.transformers.desiredProperties.guild.verificationLevel = true;
  // client.transformers.desiredProperties.guild.welcomeScreen = true;
  // client.transformers.desiredProperties.guild.widgetChannelId = true;
  // client.transformers.desiredProperties.interaction.appPermissions = true;
  // client.transformers.desiredProperties.interaction.applicationId = true;
  client.transformers.desiredProperties.interaction.channelId = true;
  client.transformers.desiredProperties.interaction.data = true;
  client.transformers.desiredProperties.interaction.guildId = true;
  // client.transformers.desiredProperties.interaction.guildLocale = true;
  client.transformers.desiredProperties.interaction.id = true;
  // client.transformers.desiredProperties.interaction.locale = true;
  client.transformers.desiredProperties.interaction.member = true;
  client.transformers.desiredProperties.interaction.message = true;
  client.transformers.desiredProperties.interaction.token = true;
  client.transformers.desiredProperties.interaction.type = true;
  client.transformers.desiredProperties.interaction.user = true;
  // client.transformers.desiredProperties.interaction.version = true;
  // client.transformers.desiredProperties.invite.channelId = true;
  // client.transformers.desiredProperties.invite.code = true;
  // client.transformers.desiredProperties.invite.createdAt = true;
  // client.transformers.desiredProperties.invite.guildId = true;
  // client.transformers.desiredProperties.invite.inviter = true;
  // client.transformers.desiredProperties.invite.maxAge = true;
  // client.transformers.desiredProperties.invite.maxUses = true;
  // client.transformers.desiredProperties.invite.targetApplication = true;
  // client.transformers.desiredProperties.invite.targetType = true;
  // client.transformers.desiredProperties.invite.targetUser = true;
  // client.transformers.desiredProperties.invite.temporary = true;
  // client.transformers.desiredProperties.invite.uses = true;
  client.transformers.desiredProperties.member.avatar = true;
  // client.transformers.desiredProperties.member.communicationDisabledUntil = true;
  // client.transformers.desiredProperties.member.deaf = true;
  client.transformers.desiredProperties.member.guildId = true;
  client.transformers.desiredProperties.member.id = true;
  // client.transformers.desiredProperties.member.joinedAt = true;
  // client.transformers.desiredProperties.member.mute = true;
  // client.transformers.desiredProperties.member.nick = true;
  // client.transformers.desiredProperties.member.pending = true;
  // client.transformers.desiredProperties.member.permissions = true;
  // client.transformers.desiredProperties.member.premiumSince = true;
  // client.transformers.desiredProperties.member.roles = true;
  client.transformers.desiredProperties.member.user = true;
  // client.transformers.desiredProperties.message.activity = true;
  // client.transformers.desiredProperties.message.application = true;
  // client.transformers.desiredProperties.message.applicationId = true;
  // client.transformers.desiredProperties.message.attachments = true;
  // client.transformers.desiredProperties.message.author = true;
  client.transformers.desiredProperties.message.channelId = true;
  client.transformers.desiredProperties.message.components = true;
  // client.transformers.desiredProperties.message.content = true;
  // client.transformers.desiredProperties.message.editedTimestamp = true;
  // client.transformers.desiredProperties.message.embeds = true;
  client.transformers.desiredProperties.message.guildId = true;
  client.transformers.desiredProperties.message.id = true;
  // client.transformers.desiredProperties.message.interaction = {
  //   id: true,
  //   member: true,
  //   name: true,
  //   type: true,
  //   user: true,
  // };
  // client.transformers.desiredProperties.message.member = true;
  // client.transformers.desiredProperties.message.mentionedChannelIds = true;
  // client.transformers.desiredProperties.message.mentionedRoleIds = true;
  // client.transformers.desiredProperties.message.mentions = true;
  // client.transformers.desiredProperties.message.messageReference = {
  //   channelId: true,
  //   guildId: true,
  //   messageId: true,
  // };
  // client.transformers.desiredProperties.message.nonce = true;
  // client.transformers.desiredProperties.message.reactions = true;
  // client.transformers.desiredProperties.message.stickerItems = true;
  // client.transformers.desiredProperties.message.thread = true;
  // client.transformers.desiredProperties.message.type = true;
  // client.transformers.desiredProperties.message.webhookId = true;
  // client.transformers.desiredProperties.role.botId = true;
  // client.transformers.desiredProperties.role.color = true;
  client.transformers.desiredProperties.role.guildId = true;
  // client.transformers.desiredProperties.role.hoist = true;
  // client.transformers.desiredProperties.role.icon = true;
  client.transformers.desiredProperties.role.id = true;
  // client.transformers.desiredProperties.role.integrationId = true;
  // client.transformers.desiredProperties.role.managed = true;
  // client.transformers.desiredProperties.role.mentionable = true;
  client.transformers.desiredProperties.role.name = true;
  // client.transformers.desiredProperties.role.permissions = true;
  // client.transformers.desiredProperties.role.position = true;
  // client.transformers.desiredProperties.role.subscriptionListingId = true;
  // client.transformers.desiredProperties.role.unicodeEmoji = true;
  // client.transformers.desiredProperties.scheduledEvent.channelId = true;
  // client.transformers.desiredProperties.scheduledEvent.creator = true;
  // client.transformers.desiredProperties.scheduledEvent.creatorId = true;
  // client.transformers.desiredProperties.scheduledEvent.description = true;
  // client.transformers.desiredProperties.scheduledEvent.entityId = true;
  // client.transformers.desiredProperties.scheduledEvent.entityType = true;
  // client.transformers.desiredProperties.scheduledEvent.guildId = true;
  // client.transformers.desiredProperties.scheduledEvent.id = true;
  // client.transformers.desiredProperties.scheduledEvent.image = true;
  // client.transformers.desiredProperties.scheduledEvent.location = true;
  // client.transformers.desiredProperties.scheduledEvent.name = true;
  // client.transformers.desiredProperties.scheduledEvent.privacyLevel = true;
  // client.transformers.desiredProperties.scheduledEvent.scheduledEndTime = true;
  // client.transformers.desiredProperties.scheduledEvent.scheduledStartTime = true;
  // client.transformers.desiredProperties.scheduledEvent.status = true;
  // client.transformers.desiredProperties.scheduledEvent.userCount = true;
  // client.transformers.desiredProperties.stageInstance.channelId = true;
  // client.transformers.desiredProperties.stageInstance.guildId = true;
  // client.transformers.desiredProperties.stageInstance.guildScheduledEventId = true;
  // client.transformers.desiredProperties.stageInstance.id = true;
  // client.transformers.desiredProperties.stageInstance.topic = true;
  // client.transformers.desiredProperties.sticker.available = true;
  // client.transformers.desiredProperties.sticker.description = true;
  // client.transformers.desiredProperties.sticker.formatType = true;
  // client.transformers.desiredProperties.sticker.guildId = true;
  // client.transformers.desiredProperties.sticker.id = true;
  // client.transformers.desiredProperties.sticker.name = true;
  // client.transformers.desiredProperties.sticker.packId = true;
  // client.transformers.desiredProperties.sticker.sortValue = true;
  // client.transformers.desiredProperties.sticker.tags = true;
  // client.transformers.desiredProperties.sticker.type = true;
  // client.transformers.desiredProperties.sticker.user = true;
  // client.transformers.desiredProperties.user.accentColor = true;
  client.transformers.desiredProperties.user.avatar = true;
  // client.transformers.desiredProperties.user.banner = true;
  // client.transformers.desiredProperties.user.bot = true;
  // client.transformers.desiredProperties.user.discriminator = true;
  // client.transformers.desiredProperties.user.email = true;
  // client.transformers.desiredProperties.user.flags = true;
  // client.transformers.desiredProperties.user.globalName = true;
  client.transformers.desiredProperties.user.id = true;
  // client.transformers.desiredProperties.user.locale = true;
  // client.transformers.desiredProperties.user.mfaEnabled = true;
  // client.transformers.desiredProperties.user.premiumType = true;
  // client.transformers.desiredProperties.user.publicFlags = true;
  // client.transformers.desiredProperties.user.system = true;
  client.transformers.desiredProperties.user.username = true;
  // client.transformers.desiredProperties.user.verified = true;
  // client.transformers.desiredProperties.webhook.applicationId = true;
  // client.transformers.desiredProperties.webhook.avatar = true;
  // client.transformers.desiredProperties.webhook.channelId = true;
  // client.transformers.desiredProperties.webhook.guildId = true;
  // client.transformers.desiredProperties.webhook.id = true;
  // client.transformers.desiredProperties.webhook.name = true;
  // client.transformers.desiredProperties.webhook.sourceChannel = true;
  // client.transformers.desiredProperties.webhook.sourceGuild = true;
  // client.transformers.desiredProperties.webhook.token = true;
  // client.transformers.desiredProperties.webhook.type = true;
  // client.transformers.desiredProperties.webhook.url = true;
  // client.transformers.desiredProperties.webhook.user = true;
}
