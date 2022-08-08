import { DB, Repository } from "query-core";
import { Team, teamModel, TeamRepository } from "./team";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository
{
  constructor(db: DB) {
    super(db, "teams", teamModel);
  }

  getTeamByTournamentId(tournamentId: string): Promise<Team[]> {
    return this.query<Team>(
      `SELECT * from teams where tournamentId = ${this.param(1)}`,
      [tournamentId],
      this.map
    );
  }
}
