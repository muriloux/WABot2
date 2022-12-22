import fs from "fs";
import path from "path";
import Commands from "../commands";

export const generateHelpText = async () => {
  const cmds = new Commands();
  const indexes = Object.getOwnPropertyNames(cmds);
  var textArray: string[] | string = [];

  indexes.forEach((i) => {
    //@ts-ignore
    textArray.push(
      //@ts-ignore
      `• *${
        //@ts-ignore

        cmds[i].alias
          ? //@ts-ignore

            cmds[i].command + " | " + cmds[i].alias
          : //@ts-ignore

            cmds[i].command
      }* ➞  ${
        //@ts-ignore
        cmds[i].description
      }`
    );
  });

  textArray = textArray.join("\n");

  const textObj = {
    text: textArray,
  };

  fs.writeFile(
    path.resolve(__dirname, "..", "..", "cache", "helpText.json"),
    JSON.stringify(textObj),
    (e) => {
      e ? console.log(e) : console.log("helpText.json created.\n");
    }
  );
};
