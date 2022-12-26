import { processModel } from "../process/process";
import { buildToInsert, buildToUpdate, DB, Repository } from "query-core";
import { Match, matchModel, MatchRepository, Process, Team } from "./match";
import { teamModel } from "../team/team";

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
  async endMatch(match: Match): Promise<number>{

    if(!match.home.homepoint) match.home.homepoint = {won:0,lost:0}
    if(!match.away.awaypoint) match.away.awaypoint = {won:0,lost:0}


    if(match.homeResult > match.awayResult){
      match.home.won  = match.home.won + 1
      match.away.lost += 1
      match.home.homepoint.won += 1
      match.away.awaypoint.lost += 1


    }else if (match.homeResult < match.awayResult){
      match.away.won += 1
      match.home.lost += 1
      match.home.homepoint.lost += 1
      match.away.awaypoint.won += 1
    }else {
      match.home.drawn += 1
      match.away.drawn += 1
    }


    const homeUpdate: Team = {
      id: match.home.id,
      won: match.home.won,
      lost: match.home.lost,
      drawn:match.home.drawn,
      homepoint:match.home.homepoint,
    }
    const awayUpdate: Team = {
      id: match.away.id,
      won: match.away.won,
      lost: match.away.lost,
      drawn: match.away.drawn,
      awaypoint: match.away.awaypoint,
    }

    const q1 = buildToUpdate({id: match.id, endmatch: true},"matches",matchModel,this.param)
    const q2 = buildToUpdate(homeUpdate,"teams",teamModel,this.param)
    const q3 = buildToUpdate(awayUpdate,"teams",teamModel,this.param)

    return this.execBatch([q1,q2,q3]).then(c => c>0?1:0)
  }
}
