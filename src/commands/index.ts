import All from "./lib/all";
import Dice from "./lib/dice";
import Help from "./lib/help";
import Sticker from "./lib/sticker";

export default class Commands {
  help = new Help();
  dice = new Dice();
  all = new All();
  sticker = new Sticker();
}
