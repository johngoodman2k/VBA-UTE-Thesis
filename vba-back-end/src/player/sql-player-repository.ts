import { DB, Repository } from "query-core";
import { Player, playerModel, PlayerRepository } from "./player";
import { getPlayersByTeamId } from "./query";

export class SqlPlayerRepository
  extends Repository<Player, string>
  implements PlayerRepository
{
  constructor(db: DB) {
    super(db, "players", playerModel);
  }
  getPlayersByTeamId(teamId: string): Promise<Player[]> {
    return this.query<Player>(getPlayersByTeamId, [teamId]);
  }
}
