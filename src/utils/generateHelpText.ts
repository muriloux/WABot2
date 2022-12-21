// run through command/index.ts file
// get command.pattern -> command.description of each
// write file with all definitions
import fs from "fs";
import path from "path";
import Commands from "../commands";

export const generateHelpText = async () => {
  const cmds = new Commands();
  const indexes = Object.getOwnPropertyNames(cmds);
  var textArray: string[] | string = [];

  indexes.forEach((i) => {
    //@ts-ignore
    textArray.push(`• ${cmds[i].command} ➞  ${cmds[i].description}`);
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
