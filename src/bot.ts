import Commands from "./commands";
import { connect } from "./connection";
import { logMessages } from "./utils/logMessages";

export default async () => {
  const socket = await connect();
  const cmds = new Commands();
  const onlineStatus = "🟢 ON - Meow ~ !h | !help";
  const offlineStatus = "🔴 OFF - Meow ";

  socket.ev.on("messages.upsert", async (message) => {
    logMessages(message);

    cmds.help.execute(socket, message);
    cmds.dice.execute(socket, message);
    cmds.all.execute(socket, message);
    cmds.sticker.execute(socket, message);
  });

  socket.ev.on("connection.update", (update) => {
    update.isOnline && socket.updateProfileStatus(onlineStatus);
  });

  // process.on("SIGINT", function () {
  //   socket.updateProfileStatus(offlineStatus);

  //   process.exit();
  // });
};
