import { buildToInsertBatch, DB, Repository } from "query-core";
import {
  Team,
  teamModel,
  TeamRepository,
  Player,
  PlayerRepository,
} from "./team";
import { playerModel } from "../player/player";
import { getPlayerById } from "./query";
import { param } from "pg-extension";

export class SqlPlayerRepository
  extends Repository<Player, string>
  implements PlayerRepository
{
  constructor(db: DB) {
    super(db, "players", playerModel);
  }

  getPlayerById(player: string, ctx?: any): Promise<Player[]> {
    return this.query(getPlayerById, [player]);
  }

}
