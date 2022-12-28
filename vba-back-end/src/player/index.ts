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
    TeamRepository,
} from "./player";
import { PlayerController } from "./player-controller";
export * from "./player";
export { PlayerController };
import { SqlPlayerRepository } from "./sql-player-repository";
import { SqlTeamRepository } from "./sql-team-repository";
import { Tenant } from "firebase-admin/lib/auth/tenant";

export class PlayerManager
    extends Manager<Player, string, PlayerFilter>
    implements PlayerService
{
    constructor(
        search: Search<Player, PlayerFilter>,
        protected playerrepository: PlayerRepository,
        protected teamrepository: TeamRepository

    ) {
        super(search, playerrepository);
    }

    getPlayersByTeamId(teamId: string): Promise<Player[]> {
        return this.playerrepository.getPlayersByTeamId(teamId);
    }
    updatePlayer(id:string,player:Player):Promise<number>{
        return this.playerrepository.updatePlayer(id,player);
    }
    getAllPlayer():Promise<Player[]>{
        return this.playerrepository.getAllPlayer();
    }
    getTeamById(teamId: string): Promise<Team>{
        return this.teamrepository.getTeamById(teamId)
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
    const teamrepository = new SqlTeamRepository(db);

    return new PlayerManager(builder.search, playerrepository,teamrepository);
}
export function usePlayerController(log: Log, db: DB): PlayerController {
    return new PlayerController(log, usePlayerService(db));
}
