import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
import { buildQuery } from "./query";
import {
    Player,
    PlayerFilter,
    playerModel,
    PlayerRepository,
    PlayerService,
    Team,
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
        protected playerrepository: PlayerRepository
    ) {
        super(search, playerrepository);
    }

    getPlayersByTeamId(teamId: Team): Promise<Player[]> {
        return this.playerrepository.getPlayersByTeamId(teamId);
    }
}
export function usePlayerService(db: DB): PlayerService {
    const builder = new SearchBuilder<Player, PlayerFilter>(
        db.query,
        "players",
        playerModel,
        postgres,
        buildQuery
    );
    const playerrepository = new SqlPlayerRepository(db);
    return new PlayerManager(builder.search, playerrepository);
}
export function usePlayerController(log: Log, db: DB): PlayerController {
    return new PlayerController(log, usePlayerService(db));
}
