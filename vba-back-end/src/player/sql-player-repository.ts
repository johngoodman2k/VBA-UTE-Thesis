import { DB, Repository } from "query-core";
import { Player, PlayerModel, PlayerRepository } from "./player";

export class SqlPlayerRepository
  extends Repository<Player, string>
  implements PlayerRepository
{
  constructor(db: DB) {
    super(db, "players", PlayerModel);
  }
}
