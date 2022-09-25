import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import {
  Season,
  SeasonFilter,
  seasonModel,
  SeasonRepository,
  SeasonService,
} from "./season";
import { SeasonController } from "./season-controller";
export * from "./season";
export { SeasonController };
import { SqlSeasonRepository } from "./sql-season-repository";

export class SeasonManager
  extends Manager<Season, string, SeasonFilter>
  implements SeasonService
{
  constructor(
    search: Search<Season, SeasonFilter>,
    protected seasonRepository: SeasonRepository
  ) {
    super(search, seasonRepository);
  }
}
export function useSeasonService(db: DB): SeasonService {
  const builder = new SearchBuilder<Season, SeasonFilter>(
    db.query,
    "season",
    seasonModel,
    postgres
  );
  const repository = new SqlSeasonRepository(db);
  return new SeasonManager(builder.search, repository);
}
export function useSeasonController(log: Log, db: DB): SeasonController {
  return new SeasonController(log, useSeasonService(db));
}
