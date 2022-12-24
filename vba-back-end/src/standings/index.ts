import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import {
  Standings,
  StandingsFilter,
  standingsModel,
  StandingsRepository,
  StandingsService,
} from "./standings";
import { StandingsController } from "./standings-controller";
// export * from "./standings";
export { StandingsController };
import { SqlStandingsRepository } from "./sql-standings-repository";

export class StandingsManager
  extends Manager<Standings, string, StandingsFilter>
  implements StandingsService
{
  constructor(
    search: Search<Standings, StandingsFilter>,
    protected repository: StandingsRepository
  ) {
    super(search, repository);
  }
  getStangdingsBySeasonId(seasonId:string):Promise<Standings[]>{
    return this.repository.getStangdingsBySeasonId(seasonId)
  }
}
export function useStandingsService(db: DB): StandingsService {
  const builder = new SearchBuilder<Standings, StandingsFilter>(
    db.query,
    "standings",
    standingsModel,
    postgres
  );
  const repository = new SqlStandingsRepository(db);
  return new StandingsManager(builder.search, repository);
}
export function useStandingsController(log: Log, db: DB): StandingsController {
  return new StandingsController(log, useStandingsService(db));
}
