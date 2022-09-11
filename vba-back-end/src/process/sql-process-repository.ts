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
}
