import { IMessage, socketObject } from "../commands/types";

export const sendCatReaction = (socket: socketObject, message: IMessage) => {
  socket.sendMessage(message.messages[0].key.remoteJid!, {
    react: {
      text: "🐱",
      key: message.messages[0].key,
    },
  });
};
