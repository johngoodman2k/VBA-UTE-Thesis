import { DB, Repository } from "query-core";
import { Match, matchModel, MatchRepository, Process } from "./match";

export class SqlMatchRepository
  extends Repository<Match, string>
  implements MatchRepository
{
  constructor(db: DB) {
    super(db, "matches", matchModel);
  }
  getMatches(tournamentId: string, round: string): Promise<Match[]> {
    return this.query<Match>(
      "select * from match where tournamentId = $1 and round = $2",
      [tournamentId, round],
      this.map
    );
  }
  updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]> {
    return this.query<Match>("update matches set process = $2 where id =$1", [
      id,
      process,
    ]);
  }
  getMatchById(matchId: string): Promise<Match[]> {
    return this.query<Match>(
      "select * from matches where id = $1",
      [matchId],
      this.map
    );
  }
}
