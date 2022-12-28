import { handleError } from "express-ext";
import { matchModel } from "../match/match";
import { param, Statement } from "pg-extension";
import { buildToInsertBatch, buildToUpdate, DB, Repository } from "query-core";
import { MatchRepository, Match } from "./tournament";
// import { Match } from "../match/match";

export class SqlMatchRepository
  extends Repository<Match, string>
  implements MatchRepository
{
  constructor(db: DB) {
    super(db, "matches", matchModel);
  }

  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number> {
    const stmt = buildToInsertBatch<Match>(
      matches,
      "matches",
      matchModel,
      param
    );
    if (!stmt) {
      return Promise.resolve(0);
    } else {
      return this.exec(stmt.query, stmt.params, ctx);
    }
  }
  getMatchesBySeasonId(matchId:string):Promise<Match[]>{
    return this.query<Match>("select *from matches where seasonId =$1",[matchId])
  }
  getMatchesByRoundId(roundId:string):Promise<Match[]>{
    return this.query<Match>("select *from matches where round =$1",[roundId],this.map)
  }
  updateMatch(matches: Match[]):Promise<number>{
    const stmt = [] as Statement[]
    for(const m of matches){
      const q = buildToUpdate(m, "matches",matchModel,this.param)
      stmt.push(q)
    }
    return this.execBatch(stmt)
  }
}
