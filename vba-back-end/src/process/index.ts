import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import {
  Process,
  ProcessFilter,
  processModel,
  ProcessRepository,
  ProcessService,
} from "./process";
import { ProcessController } from "./process-controller";
export * from "./process";
export { ProcessController };
import { SqlProcessRepository } from "./sql-process-repository";

export class ProcessManager
  extends Manager<Process, string, ProcessFilter>
  implements ProcessService
{
  constructor(
    search: Search<Process, ProcessFilter>,
    protected processRepository: ProcessRepository
  ) {
    super(search, processRepository);
  }
  getMatches(tournamentId: string, round: string): Promise<Process[]> {
    return this.processRepository.getMatches(tournamentId, round);
  }
  getProcessesByMatchId(matchId: string): Promise<Process[]> {
    return this.processRepository.getProcessesByMatchId(matchId);
  }
}
export function useProcessService(db: DB): ProcessService {
  const builder = new SearchBuilder<Process, ProcessFilter>(
    db.query,
    "process",
    processModel,
    postgres
  );
  const repository = new SqlProcessRepository(db);
  return new ProcessManager(builder.search, repository);
}
export function useProcessController(log: Log, db: DB): ProcessController {
  return new ProcessController(log, useProcessService(db));
}
