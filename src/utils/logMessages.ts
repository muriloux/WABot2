import { IMessage } from "../commands/types";
import util from "util";

export const logMessages = (message: IMessage, detailed?: Boolean) => {
  detailed
    ? console.log(util.inspect(message, true, 5, true))
    : console.log(
        `[${
          message.messages[0].pushName || message.messages[0].key.remoteJid
        }]:\n${message.messages[0].message?.extendedTextMessage?.text}`
      );
};
