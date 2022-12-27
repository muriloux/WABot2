import { Command, IMessage, socketObject } from "../types";
import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import { sendCatReaction } from "../../utils/sendCatReaction";
import { markAsRead } from "../../utils/markAsRead";

export default class Youtube implements Command {
  command = "!ytd <link>";
  pattern =
    /!ytd(?= https:\/\/((www.youtube|youtube).com|(www.youtu.be|youtu.be))\/\w+)/;
  parameter: string;
  description = "Baixa audio do Youtube.";
  execute = async (socket: socketObject, message: IMessage) => {
    if (
      message.messages[0].message?.extendedTextMessage?.text?.match(
        this.pattern
      )
    ) {
      markAsRead(socket, message);
      sendCatReaction(socket, message);
      this.parameter =
        message.messages[0].message?.extendedTextMessage?.text.replace(
          "!ytd ",
          ""
        );

      const url = this.parameter;
      const info = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(info.formats, {
        quality: "highestaudio",
        filter: "audioonly",
      });

      const filename = Date.now().toString();
      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "temp",
        `${filename}.mp3`
      );

      //console.log(url);

      if (parseInt(info.videoDetails.lengthSeconds) > 600) {
        socket.sendMessage(message.messages[0].key.remoteJid!, {
          text: "Apenas vídeos com menos de 10 minutos.",
        });
        console.log("Too big video");

        return;
      }

      let stream = ytdl(url, { format: format });

      socket.sendMessage(message.messages[0].key.remoteJid!, {
        audio: { stream: stream },
      });
      stream.destroy();
    }
  };
}
