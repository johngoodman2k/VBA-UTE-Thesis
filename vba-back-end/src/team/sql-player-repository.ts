import { DB, Repository } from "query-core";
import {
  Team,
  teamModel,
  TeamRepository,
  Player,
  PlayerRepository,
} from "./team";
import { playerModel } from "../player/player";

export class SqlPlayerRepository
  extends Repository<Player, string>
  implements PlayerRepository
{
  constructor(db: DB) {
    super(db, "players", playerModel);
  }

  addPlayer(player: Player, ctx?: any): Promise<number> {
    return this.insert(player, ctx);
  }
}
