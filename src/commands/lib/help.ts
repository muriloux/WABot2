import { Command, IMessage, socketObject } from "../types";
export default class Help implements Command {
  command = "!h";
  alias = "!help";
  pattern = /^(!h|!help)$/;
  description = "Mostra a lista de comandos.";
  execute = async (socket: typeof socketObject, message: IMessage) => {
    if (
      message.messages[0].message?.extendedTextMessage?.text?.match(
        this.pattern
      )
    ) {
      socket.sendMessage(message.messages[0].key.remoteJid!, {
        text:
          require("../../../cache/helpText.json").text ||
          "Error fetching commands text.",
      });
    }
  };
}
