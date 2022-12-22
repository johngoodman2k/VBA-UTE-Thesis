import { processModel } from "../process/process";
import { buildToInsert, buildToUpdate, DB, Repository } from "query-core";
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
  getMatchDetails(matchId: string): Promise<Match[]>{
    return this.query<Match>("select * from matches where id = $1",[matchId])
  }

  createProcessAndAddProcessToMatch(process:Process,match:Match):Promise<number>{
    const q1 = buildToInsert(process,"process",processModel,this.param)
    const q2 = buildToUpdate(match,"matches",matchModel,this.param)


    return this.execBatch([q1,q2]).then(c => c>0?1:0)

  }
}
