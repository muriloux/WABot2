//import ytdl from "ytdl-core";
import fs from "fs";

const url = "https://www.youtube.com/watch?v=kuvST3wGCG8";

const doSome = async () => {
  const info = await ytdl.getInfo(url);
  //   console.log(info);
  const format = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });

  ytdl(url, {
    format: format,
  }).pipe(fs.createWriteStream("video.mp3"));
};

doSome();
