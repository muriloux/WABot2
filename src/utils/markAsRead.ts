import { IMessage, socketObject } from "../commands/types";

export const markAsRead = async (socket: socketObject, message: IMessage) => {
  const key = {
    remoteJid: message.messages[0].key.remoteJid,
    id: message.messages[0].key.id,
    participant: message.messages[0].key.participant,
  };

  await socket.readMessages([key]);
};
