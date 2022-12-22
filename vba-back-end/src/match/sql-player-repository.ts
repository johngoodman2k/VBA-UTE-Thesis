import { buildToInsertBatch, DB, Repository } from "query-core";
import { Player, PlayerRepository, Process, ProcessRepository } from "./match";
import { processModel } from "../process/process";
import { param } from "pg-extension";
import {  playerModel } from "../player/player";

export class SqlPlayerRepository
  extends Repository<Player, string>
  implements PlayerRepository
{
  constructor(db: DB) {
    super(db, "players", playerModel);
  }
  getPlayerByTeamId(teamId:string):Promise<Player[]> {
    return this.query<Player>("select * from players where teamid =$1",[teamId])
  }
}
