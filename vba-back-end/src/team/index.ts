import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder, buildToInsertBatch } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";
import { SqlPlayerRepository } from "./sql-player-repository";
import { SqlTeamRepository } from "./sql-team-repository";
export { TeamController };
import {
  Player,
  PlayerRepository,
  Team,
  TeamFilter,
  teamModel,
  TeamRepository,
  TeamService,
} from "./team";
import { TeamController } from "./team-controller";

export class TeamManager
  extends Manager<Team, string, TeamFilter>
  implements TeamService
{
  constructor(
    search: Search<Team, TeamFilter>,
    protected teamrepository: TeamRepository,
    protected playerrepository: PlayerRepository
  ) {
    super(search, teamrepository);
  }
  getTeamByTournamentId(tournamentId: string): Promise<Team[]> {
    return this.teamrepository.getTeamByTournamentId(tournamentId);
  }
  addPlayer(player: Player, ctx?: any): Promise<number> {
    return this.playerrepository.addPlayer(player, ctx);
  }
}
export function useTeamService(db: DB, mapper?: TemplateMap): TeamService {
  const query = useQuery("teams", mapper, teamModel, true);
  const builder = new SearchBuilder<Team, TeamFilter>(
    db.query,
    "teams",
    teamModel,
    postgres,
    query
  );
  const teamrepository = new SqlTeamRepository(db);
  const playerrepository = new SqlPlayerRepository(db);

  return new TeamManager(builder.search, teamrepository, playerrepository);
}
export function useTeamController(
  log: Log,
  db: DB,
  mapper?: TemplateMap
): TeamController {
  return new TeamController(log, useTeamService(db, mapper));
}
