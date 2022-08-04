import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
import { buildQuery } from "./query";
import {
  Player,
  PlayerFilter,
  PlayerModel,
  PlayerRepository,
  PlayerService,
} from "./player";
import { PlayerController } from "./player-controller";
export * from "./player";
export { PlayerController };
import { SqlPlayerRepository } from "./sql-player-repository";

export class PlayerManager
  extends Manager<Player, string, PlayerFilter>
  implements PlayerService
{
  constructor(
    search: Search<Player, PlayerFilter>,
    repository: PlayerRepository
  ) {
    super(search, repository);
  }
}
export function usePlayerService(db: DB): PlayerService {
  const builder = new SearchBuilder<Player, PlayerFilter>(
    db.query,
    "players",
    PlayerModel,
    postgres,
    buildQuery
  );
  const repository = new SqlPlayerRepository(db);
  return new PlayerManager(builder.search, repository);
}
export function usePlayerController(log: Log, db: DB): PlayerController {
  return new PlayerController(log, usePlayerService(db));
}
