import bot from "./bot";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

if (process.env.AUTH_STATE) {
  fs.writeFileSync(
    path.resolve(__dirname, "..", "cache", "auth_info_multi.json"),

    process.env.AUTH_STATE as string
  );
}

bot();
