import path from "path";
import fs from "fs";
import { generateHelpText } from "./utils/generateHelpText";
import makeWASocket from "@adiwajshing/baileys/lib/Socket";
import { DisconnectReason } from "@adiwajshing/baileys";
import { useMultiFileAuthState } from "@adiwajshing/baileys/lib/Utils";
import { Boom } from "@hapi/boom";

export const connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, "..", "cache", "auth_info_multi")
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

  socket.ev.on("creds.update", saveCreds);

  return socket;
};
