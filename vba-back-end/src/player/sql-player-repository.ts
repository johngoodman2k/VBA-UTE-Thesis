import { DB, Repository } from "query-core";
import { Team } from "./player";
import { Player, playerModel, PlayerRepository } from "./player";
import { getPlayersByTeamId } from "./query";

export class SqlPlayerRepository
  extends Repository<Player, string>
  implements PlayerRepository
{
  constructor(db: DB) {
    super(db, "players", playerModel);
  }
  getPlayersByTeamId(teamId: Team): Promise<Player[]> {
    return this.query<Player>(`select * from players where teams @> $1`, [
      teamId,
    ]);
  }
}
