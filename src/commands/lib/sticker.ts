import { Command, IMessage, socketObject } from "../types";
export default class Sticker implements Command {
  command = "!s";
  pattern = new RegExp("^!s$");
  description = "Cria um sticker.";
  execute = async (socket: typeof socketObject, message: IMessage) => {
    if (
      message.messages[0].message?.extendedTextMessage?.text?.match(
        this.pattern
      )
    ) {
      socket.sendMessage(message.messages[0].key.remoteJid!, {
        text: `Here is your Sticker: ${this.description}`,
      });
    }
  };
}
