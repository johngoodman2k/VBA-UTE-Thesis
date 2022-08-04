import { DB, Repository } from "query-core";
import { Standings, standingsModel, StandingsRepository } from "./standings";

export class SqlStandingsRepository
  extends Repository<Standings, string>
  implements StandingsRepository
{
  constructor(db: DB) {
    super(db, "standings", standingsModel);
  }
}
