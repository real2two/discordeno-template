// Feel free to customize this file as much as you want!

// The response for all IPC responses
export interface IPCMessageResponses {
  getGuild: {
    guildId: string;
    cool: "message" | "response" | "thing";
  };
}
