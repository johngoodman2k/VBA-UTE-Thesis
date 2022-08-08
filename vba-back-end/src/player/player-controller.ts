import { Controller, Log } from "express-ext";
import { Player, PlayerFilter, PlayerService } from "./player";

export class PlayerController extends Controller<Player, string, PlayerFilter> {
  constructor(log: Log, PlayerService: PlayerService) {
    super(log, PlayerService);
  }
}
