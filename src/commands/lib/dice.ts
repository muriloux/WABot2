import { Command, IMessage, socketObject } from "../types";
import { markAsRead } from "../../utils/markAsRead";
export default class Dice implements Command {
  command = "!d";
  alias = "!dice";
  pattern = /^(!d|!dice)$/;
  description = "Joga um dado de 6 lados.";
  execute = async (socket: socketObject, message: IMessage) => {
    if (
      message.messages[0].message?.extendedTextMessage?.text?.match(
        this.pattern
      )
    ) {
      markAsRead(socket, message);

      const dice = Math.floor(Math.random() * 6) + 1;
      socket.sendMessage(message.messages[0].key.remoteJid!, {
        text: `🎲 ↝ ${dice.toString()}`,
      });
    }
  };
}
