import {
  type BaseInteraction,
  type Bot,
  type InteractionCallbackData,
  type Interaction,
  type Message,
  type User,
  type Member,
} from "@discordeno/bot";

export class CommandHandler<B extends Bot> {
  client: B;
  message?: Message;
  interaction?: Interaction;

  isDeferred: boolean;
  hasResponded: boolean;
  original?: {
    id: bigint;
    channelId: bigint;
  };

  data: {
    guildId?: bigint;
    channelId?: bigint;
    userId: bigint;
    user: User;
    member?: Member;
  };

  constructor({
    client,
    message,
    interaction,
  }: {
    client: B;
    message?: Message;
    interaction?: Interaction;
  }) {
    this.client = client;
    this.message = message;
    this.interaction = interaction;

    this.isDeferred = false;
    this.hasResponded = false;

    this.data = {
      guildId: interaction?.guildId || message?.guildId,
      channelId: this.interaction?.channelId || this.message?.channelId,
      userId: this.interaction?.user.id || this.message?.author.id as bigint,
      user: interaction?.user || (message?.author as User),
      member: interaction?.member || message?.member,
    };

    if (!this.message && !this.interaction)
      throw new Error(
        "Must have at least message or interaction (<CommandHandler>)",
      );
    if (this.message && this.interaction)
      throw new Error(
        "Cannot have both message or interaction (<CommandHandler>)",
      );
  }

  defer(silent = false) {
    if (this.isDeferred)
      throw new Error(
        "The interaction has already been deferred (<CommandHandler>.defer)",
      );

    this.isDeferred = true;
    if (this.interaction) {
      return this.interaction.defer(silent);
    }
  }

  async respond(
    data: InteractionCallbackData,
    opts?: Parameters<BaseInteraction["respond"]>[1],
  ) {
    if (this.hasResponded)
      throw new Error("Interaction already responded (<CommandHandler>.defer)");

    this.hasResponded = true;
    if (this.message) {
      const message = await this.sendMessage(data);
      if (!this.original) {
        this.original = {
          id: message.id,
          channelId: message.channelId,
        };
      }
      return message;
    } else if (this.interaction) {
      return (await this.interaction.respond(data, opts)) as unknown as Message;
    }
  }

  async sendFollowup(
    data: InteractionCallbackData,
    opts?: Parameters<BaseInteraction["respond"]>[1],
  ) {
    if (!this.hasResponded)
      throw new Error(
        "Cannot send follow up if the interaction wasn't responded (<CommandHandler>.defer)",
      );

    if (this.message) {
      return this.sendMessage(data);
    } else if (this.interaction) {
      return this.interaction.respond(
        data,
        opts,
      ) as unknown as Promise<Message>;
    } else {
      throw new Error(
        "This error should never happen, but either message or interaction is missing (<CommandHandler>.defer)",
      );
    }
  }

  sendMessage(data: InteractionCallbackData) {
    if (!this.data.channelId)
      throw new Error("Cannot find channel id (<CommandHandler>.sendMessage)");
    return this.client.helpers.sendMessage(this.data.channelId, data);
  }

  async editOriginal(data: InteractionCallbackData) {
    if (this.message) {
      if (this.hasResponded) {
        if (!this.original)
          throw new Error(
            "Cannot find original message (<CommandHandler>.editOriginal)",
          );

        return await this.client.helpers.editMessage(
          this.original.channelId,
          this.original.id,
          data,
        );
      } else if (this.isDeferred) {
        this.hasResponded = true;
        const message = await this.sendMessage(data);
        this.original = {
          id: message.id,
          channelId: message.channelId,
        };
        return message;
      } else {
        throw new Error(
          "Cannot edit original message if the message command never deferred or responded in the first place (<CommandHandler>.editOriginal)",
        );
      }
    } else if (this.interaction) {
      return await this.interaction.edit(data);
    }
  }

  editFollowUp(message: Message, data: InteractionCallbackData) {
    if (this.message) {
      return this.client.helpers.editMessage(
        message.channelId,
        message.id,
        data,
      );
    } else if (this.interaction) {
      return this.client.helpers.editFollowupMessage(
        this.interaction.token,
        message.id,
        data,
      );
    }
  }
}
