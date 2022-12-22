import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import {
    Match,
    MatchFilter,
    matchModel,
    MatchRepository,
    MatchService,
    Player,
    PlayerRepository,
    Process,
    ProcessRepository,
    TeamRepository,
} from "./match";
import { MatchController } from "./match-controller";
export * from "./match";
export { MatchController };
import { SqlMatchRepository } from "./sql-match-repository";
import { SqlTeamRepository } from "./sql-team-repository";
import { SqlProcessRepository } from "./sql-process-repository";
import { Team } from "../team/team";
import { SqlPlayerRepository } from "./sql-player-repository";

export class MatchManager
    extends Manager<Match, string, MatchFilter>
    implements MatchService
{
    constructor(
        search: Search<Match, MatchFilter>,
        protected matchRepository: MatchRepository,
        protected processRepository: ProcessRepository,
        protected teamRepository: TeamRepository,
        protected playerRepository: PlayerRepository
    ) {
        super(search, matchRepository);
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
    getMatchDetails(matchId: string): Promise<Match[]>{
        return this.matchRepository.getMatchDetails(matchId);
    }
    getTeamByMatchId(matchId: string): Promise<Team[]>{
        return this.teamRepository.getTeamByMatchId(matchId);
    }
    getTeamById(teamId: string): Promise<Team[]>{
        return this.teamRepository.getTeamById(teamId);
    }
    getTeamBySeasonId(seasonId: string): Promise<Team[]>{
        return this.teamRepository.getTeamBySeasonId(seasonId);
    }
    getProcessByMatchId(matchId:string): Promise<Process[]>{
        return this.processRepository.getProcessByMatchId(matchId);
    }
    getPlayerByTeamId(teamId:string):Promise<Player[]>{
        return this.playerRepository.getPlayerByTeamId(teamId);

    }
    createProcessAndAddProcessToMatch(process:Process,match:Match):Promise<number>{
        return this.matchRepository.createProcessAndAddProcessToMatch(process,match);
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
    const teamRepository = new SqlTeamRepository(db);
    const playerRepository = new SqlPlayerRepository(db);


    return new MatchManager(builder.search, matchRepository, processRepository,teamRepository,playerRepository);
}
export function useMatchController(log: Log, db: DB): MatchController {
    return new MatchController(log, useMatchService(db));
}
