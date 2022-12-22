import { DB, Repository } from "query-core";
import { Process, processModel, ProcessRepository } from "./process";

export class SqlProcessRepository
  extends Repository<Process, string>
  implements ProcessRepository
{
  constructor(db: DB) {
    super(db, "process", processModel);
  }
  getMatches(tournamentId: string, round: string): Promise<Process[]> {
    return this.query<Process>(
      `select * from match where tournamentId = ${this.param(
        1
      )} and round = ${this.param(2)}`,
      [tournamentId, round],
      this.map
    );
  }
  getProcessesByMatchId(matchId: string): Promise<Process[]> {
    return this.query<Process>("SELECT  p.id,  p.type,  p.mins,  p.quater,  p.playerone,  p.playertwo,  p.side,  p.match,  p.option,  p.description, 	pl.id as playerid, pl.firstname,  pl.lastname,  pl.image,  pl.shirtnumber,  pl.country FROM  process p INNER JOIN players pl    on p.playerone = pl.id or p.playertwo = pl.id where p.match = $1 ORDER BY p.createdat",[matchId])
  }
}
