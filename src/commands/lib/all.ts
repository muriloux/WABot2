import { Command, IMessage, socketObject } from "../types";
export default class All implements Command {
  command = "!all";
  pattern = /^!all$/;
  description = "Marca todos os membros do grupo.";
  execute = async (socket: typeof socketObject, message: IMessage) => {
    if (
      message.messages[0].key.participant &&
      message.messages[0].message?.extendedTextMessage?.text?.match(
        this.pattern
      )
    ) {
      let chatId = message.messages[0].key.remoteJid!;
      let participantsGroup = (await socket.groupMetadata(chatId))
        .participants!;
      let participantsIds: string[] = [];

      participantsGroup.forEach((obj) => {
        participantsIds.push(obj["id"]);
      });

      socket.sendMessage(chatId, {
        text: participantsIds
          .map((id) => "@" + id.replace("@s.whatsapp.net", ""))
          .join(" "),
        mentions: participantsIds,
      });
    }
  };
}
