import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import {
  Match,
  MatchFilter,
  matchModel,
  MatchRepository,
  MatchService,
  Process,
  ProcessRepository,
} from "./match";
import { MatchController } from "./match-controller";
export * from "./match";
export { MatchController };
import { SqlMatchRepository } from "./sql-match-repository";
import { SqlProcessRepository } from "./sql-process-repository";

export class MatchManager
  extends Manager<Match, string, MatchFilter>
  implements MatchService
{
  constructor(
    search: Search<Match, MatchFilter>,
    protected matchRepository: MatchRepository,
    protected processRepository: ProcessRepository
  ) {
    super(search, matchRepository);
  }
  getMatches(tournamentId: string, round: string): Promise<Match[]> {
    return this.matchRepository.getMatches(tournamentId, round);
  }
  updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]> {
    return this.matchRepository.updateMatch(id, process, ctx);
  }
  addProcess(process: Process[], ctx?: any): Promise<number> {
    return this.processRepository.addProcess(process, ctx);
  }
  getMatchById(matchId: string): Promise<Match[]> {
    return this.matchRepository.getMatchById(matchId);
  }
  getProcessById(processId: string): Promise<Process[]> {
    return this.processRepository.getProcessById(processId);
  }
  updateProcess(process: Process, ctx?: any): Promise<number> {
    return this.processRepository.updateProcess(process, ctx);
  }
}
export function useMatchService(db: DB): MatchService {
  const builder = new SearchBuilder<Match, MatchFilter>(
    db.query,
    "matches",
    matchModel,
    postgres
  );
  const matchRepository = new SqlMatchRepository(db);
  const processRepository = new SqlProcessRepository(db);

  return new MatchManager(builder.search, matchRepository, processRepository);
}
export function useMatchController(log: Log, db: DB): MatchController {
  return new MatchController(log, useMatchService(db));
}
