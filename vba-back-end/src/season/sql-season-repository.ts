import { DB, Repository } from "query-core";
import { Season, seasonModel, SeasonRepository } from "./season";

export class SqlSeasonRepository
  extends Repository<Season, string>
  implements SeasonRepository
{
  constructor(db: DB) {
    super(db, "season", seasonModel);
  }
}
