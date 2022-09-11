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
      "select * from match where tournamentId = $1 and round = $2",
      [tournamentId, round],
      this.map
    );
  }
  updateMatch(match: Match,ctx?:any): Promise<number>{
    return this.update(match,ctx)
  }
  getMatchById(matchId: string):Promise<Match[]>{
    return this.query<Match>("select * from matches where id = $1", [matchId],this.map)
  }
}
