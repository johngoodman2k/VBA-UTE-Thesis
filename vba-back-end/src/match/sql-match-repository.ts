import { DB, Repository } from "query-core";
import { Match, matchModel, MatchRepository } from "./match";

export class SqlMatchRepository
  extends Repository<Match, string>
  implements MatchRepository
{
  constructor(db: DB) {
    super(db, "matches", matchModel);
  }
  getMatches(tournamentId: string, round: string): Promise<Match[]> {
    return this.query<Match>(
      `select * from match where tournamentId = ${this.param(
        1
      )} and round = ${this.param(2)}`,
      [tournamentId, round],
      this.map
    );
  }
}
