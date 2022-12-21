import Commands from "./commands";
import { connect } from "./connection";
import { logMessages } from "./utils/logMessages";

export default async () => {
  const socket = await connect();
  const cmds = new Commands();

  socket.ev.on("messages.upsert", async (message) => {
    logMessages(message, true);

    cmds.help.execute(socket, message);
    cmds.dice.execute(socket, message);
    cmds.all.execute(socket, message);
  });
};
