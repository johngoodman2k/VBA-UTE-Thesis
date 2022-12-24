import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import {
  Standings,
  StandingsFilter,
  standingsModel,
  StandingsRepository,
  StandingsService,
  Team,
  TeamRepository,
} from "./standings";
import { StandingsController } from "./standings-controller";
// export * from "./standings";
export { StandingsController };
import { SqlStandingsRepository } from "./sql-standings-repository";
import { SqlTeamRepository } from "./sql-team-repository";

export class StandingsManager
  extends Manager<Standings, string, StandingsFilter>
  implements StandingsService
{
  constructor(
    search: Search<Standings, StandingsFilter>,
    protected standingsrepository: StandingsRepository,
    protected teamrepository: TeamRepository
  ) {
    super(search, standingsrepository);
  }
  getStangdingsBySeasonId(seasonId:string):Promise<Standings[]>{
    return this.standingsrepository.getStangdingsBySeasonId(seasonId)
  }
  getTeamsBySeasonId(seasonId: string): Promise<Team[]>{
    return this.teamrepository.getTeamsBySeasonId(seasonId)
  }
}
export function useStandingsService(db: DB): StandingsService {
  const builder = new SearchBuilder<Standings, StandingsFilter>(
    db.query,
    "standings",
    standingsModel,
    postgres
  );
  const standingsrepository = new SqlStandingsRepository(db);
  const teamrepository = new SqlTeamRepository(db);

  return new StandingsManager(builder.search, standingsrepository,teamrepository);
}
export function useStandingsController(log: Log, db: DB): StandingsController {
  return new StandingsController(log, useStandingsService(db));
}
