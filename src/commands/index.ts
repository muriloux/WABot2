import All from "./lib/all";
import Dice from "./lib/dice";
import Help from "./lib/help";

export default class Commands {
  help = new Help();
  dice = new Dice();
  all = new All();
}
