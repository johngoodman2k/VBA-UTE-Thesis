import { buildToUpdate, DB, Repository } from "query-core";
import { teamModel } from "../team/team";
import { Player, playerModel, PlayerRepository, Team, TeamRepository } from "./player";
import { getPlayersByTeamId } from "./query";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository
{
  constructor(db: DB) {
    super(db, "teams", teamModel);

  }
  getTeamById(teamId: string): Promise<Team>{
    return this.load(teamId)
  }
}

// select * from players where teams @> $1`