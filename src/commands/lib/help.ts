import { Command, IMessage, socketObject } from "../types";
import { markAsRead } from "../../utils/markAsRead";
export default class Help implements Command {
  command = "!h";
  alias = "!help";
  pattern = /^(!h|!help)$/;
  description = "Mostra a lista de comandos.";
  execute = async (socket: socketObject, message: IMessage) => {
    if (
      message.messages[0].message?.extendedTextMessage?.text?.match(
        this.pattern
      )
    ) {
      markAsRead(socket, message);

      socket.sendMessage(message.messages[0].key.remoteJid!, {
        text:
          require("../../../cache/helpText.json").text ||
          "Error fetching commands text.",
      });
    }
  };
}
