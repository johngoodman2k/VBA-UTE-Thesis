import { buildToInsertBatch, DB, Repository } from "query-core";
import {
  Team,
  teamModel,
  TeamRepository,
  Player,
  PlayerRepository,
  MatchRepository,
  Match,
} from "./team";
import { playerModel } from "../player/player";
import { getPlayerById } from "./query";
import { param } from "pg-extension";
import { matchModel } from "../match/match";

export class SqlMatchRepository
  extends Repository<Player, string>
  implements MatchRepository
{
  constructor(db: DB) {
    super(db, "matches", matchModel);
  }

  getMatchByIdTeamId(teamid:string,side: string):Promise<Match[]>{
    return this.query<Match>(`select * from matches where ${side} = $1`,[teamid])
  }


}
