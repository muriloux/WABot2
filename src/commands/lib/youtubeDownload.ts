import { Command, IMessage, socketObject } from "../types";
//import ytdl from "ytdl-core";
import fs from "fs";

export default class Help implements Command {
  command = "!ytd";
  pattern = /^!ytd$/;
  description = "Baixa audio do Youtube.";
  execute = async (socket: typeof socketObject, message: IMessage) => {
    if (
      message.messages[0].message?.extendedTextMessage?.text?.match(
        this.pattern
      )
    ) {
      socket.sendMessage(message.messages[0].key.remoteJid!, {
        text: "audio.mp3",
      });
    }
  };
}
