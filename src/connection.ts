import { DisconnectReason } from "@adiwajshing/baileys";
import makeWASocket from "@adiwajshing/baileys/lib/Socket";
import { useSingleFileAuthState } from "@adiwajshing/baileys/lib/Utils";
import path from "path";
import fs from "fs";
import { Boom } from "@hapi/boom";
import { generateHelpText } from "./utils/generateHelpText";

export const connect = async () => {
  const { state, saveState } = useSingleFileAuthState(
    path.resolve(__dirname, "..", "cache", "auth_info_multi.json")
  );

  if (!fs.existsSync(path.resolve(__dirname, "..", "cache", "helpText.json"))) {
    console.log("\nNo help command text found.\nGenerating helpText.json...");
    generateHelpText();
  }

  const socket = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as Boom).output.statusCode !==
        DisconnectReason.loggedOut;
      if (shouldReconnect) {
        await connect();
      }
    }
  });

  socket.ev.on("creds.update", saveState);

  return socket;
};
