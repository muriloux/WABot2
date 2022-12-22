import { Command, IMessage, socketObject } from "../types";
import { Sticker as Stkr, StickerTypes } from "wa-sticker-formatter";
import { downloadMediaMessage } from "@adiwajshing/baileys";
export default class Sticker implements Command {
  command = "!s";
  alias = "!sticker";
  pattern = /^(!s|!sticker)$/;
  description =
    "Cria um sticker de imagem se enviada com !s ou !sticker como legenda.";
  execute = async (socket: typeof socketObject, message: IMessage) => {
    let m = message.messages[0];

    if (
      m.message?.imageMessage &&
      m.message.imageMessage.caption?.match(this.pattern)
    ) {
      socket.sendMessage(m.key.remoteJid!, {
        react: {
          text: "🐱",
          key: m.key,
        },
      });

      const buffer = await downloadMediaMessage(m, "buffer", {});

      const sticker = new Stkr(buffer as Buffer, {
        pack: "Meow bot",
        author: "Meow ~",
        type: StickerTypes.FULL,
        id: Date.now().toString(),
        quality: 50,
      });

      socket.sendMessage(m.key.remoteJid!, await sticker.toMessage());
    }
  };
}
