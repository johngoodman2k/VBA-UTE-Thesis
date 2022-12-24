import { DB, Repository } from "query-core";
import { Standings, standingsModel, StandingsRepository } from "./standings";

export class SqlStandingsRepository
  extends Repository<Standings, string>
  implements StandingsRepository
{
  constructor(db: DB) {
    super(db, "standings", standingsModel);
  }
  getStangdingsBySeasonId(seasonId:string):Promise<Standings[]>{
    return this.query("select * from standings where seasonid = $1",[seasonId],this.map)
  }
}
