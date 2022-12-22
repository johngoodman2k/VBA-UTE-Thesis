import { buildToInsertBatch, DB, Repository } from "query-core";
import { Process, ProcessRepository } from "./match";
import { processModel } from "../process/process";
import { param } from "pg-extension";

export class SqlProcessRepository
  extends Repository<Process, string>
  implements ProcessRepository
{
  constructor(db: DB) {
    super(db, "process", processModel);
  }
  addProcess(process: Process[],ctx?: any): Promise<number>{
    const stmt = buildToInsertBatch<Process>(process, "process", processModel, param);
    if (!stmt) {
      return Promise.resolve(0);
    } else {
      return this.exec(stmt.query, stmt.params, ctx);
    }
  }
  getProcessById(processId: string): Promise<Process[]>{
    return this.query<Process>("select * from process where id = $1", [processId],this.map)
  }
  updateProcess(process: Process,ctx?:any): Promise<number>{
    return this.patch(process,ctx)
  }
  getProcessByMatchId(matchId:string): Promise<Process[]>{
    return this.query<Process>("select * from process where match = $1",[matchId],this.map)
  }
}
