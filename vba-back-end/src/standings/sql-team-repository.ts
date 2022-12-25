import { DB, Repository } from "query-core";
import { teamModel } from "../team/team";
import { Team, TeamRepository } from "./standings";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository {
  constructor(db: DB) {
    super(db, "teams", teamModel);
  }
  getTeamsBySeasonId(seasonId: string): Promise<Team[]> {
    return this.query<Team>("select * from teams where seasonid =$1", [seasonId], this.map)
  }

}
