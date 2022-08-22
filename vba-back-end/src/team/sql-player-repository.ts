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
  addPlayer(players: Player[], ctx?: any): Promise<number> {
    const stmt = buildToInsertBatch<Player>(
      players,
      "players",
      playerModel,
      param
    );
    if (!stmt) {
      return Promise.resolve(0);
    } else {
      return this.exec(stmt.query, stmt.params, ctx);
    }
  }
}
