import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder, buildToInsertBatch } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";
import { SqlTeamRepository } from "./sql-team-repository";
export { TeamController };
import {
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
    protected teamrepository: TeamRepository
  ) {
    super(search, teamrepository);
  }
  getTeamByTournamentId(tournamentId: string): Promise<Team[]> {
    return this.teamrepository.getTeamByTournamentId(tournamentId);
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
  const repository = new SqlTeamRepository(db);
  return new TeamManager(builder.search, repository);
}
export function useTeamController(
  log: Log,
  db: DB,
  mapper?: TemplateMap
): TeamController {
  return new TeamController(log, useTeamService(db, mapper));
}
