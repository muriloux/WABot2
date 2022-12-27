import { Command, IMessage, socketObject } from "../types";
import { Sticker as Stkr, StickerTypes } from "wa-sticker-formatter";
import { downloadMediaMessage } from "@adiwajshing/baileys";
import { sendCatReaction } from "../../utils/sendCatReaction";
import { markAsRead } from "../../utils/markAsRead";
export default class Sticker implements Command {
  command = "!s";
  alias = "!sticker";
  pattern = /^(!s|!sticker)$/;
  description =
    "Cria um sticker de imagem se enviada com !s ou !sticker como legenda.";
  execute = async (socket: socketObject, message: IMessage) => {
    if (
      message.messages[0].message?.imageMessage &&
      message.messages[0].message.imageMessage.caption?.match(this.pattern)
    ) {
      markAsRead(socket, message);
      sendCatReaction(socket, message);

      const buffer = await downloadMediaMessage(
        message.messages[0],
        "buffer",
        {}
      );

      const sticker = new Stkr(buffer as Buffer, {
        pack: "Meow bot",
        author: "Meow ~",
        type: StickerTypes.FULL,
        id: Date.now().toString(),
        quality: 50,
      });

      socket.sendMessage(
        message.messages[0].key.remoteJid!,
        await sticker.toMessage()
      );
    }
  };
}
