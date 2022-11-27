import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder, buildToInsertBatch } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";
import { SqlStandingsRepository } from "./sql-standings-repository";
import { SqlMatchRepository } from "./sql-match-repository";
import { SqlRoundRepository } from "./sql-round-repository";
import { SqlTeamRepository } from "./sql-team-repository";

export { TournamentController };
import { SqlTournamentRepository } from "./sql-tournament-repository";
import {
    Match,
    MatchRepository,
    Round,
    RoundRepository,
    Season,
    SeasonRepository,
    Standings,
    StandingsRepository,
    Team,
    TeamRepository,
    Tournament,
    TournamentFilter,
    tournamentModel,
    TournamentRepository,
    TournamentService,
} from "./tournament";
import { TournamentController } from "./tournament-controller";
import { SqlSeasonRepository } from "./sql-season-repository";

export class TournamentManager
    extends Manager<Tournament, string, TournamentFilter>
    implements TournamentService
{
    constructor(
        search: Search<Tournament, TournamentFilter>,
        protected tournamentRepository: TournamentRepository,
        protected roundRepository: RoundRepository,
        protected matchRepository: MatchRepository,
        protected teamRepository: TeamRepository,
        protected standingsRepository: StandingsRepository,
        protected seasonRepository: SeasonRepository
    ) {
        super(search, tournamentRepository);
    }

    buildToInsertMatches(matches: Match[], ctx?: any): Promise<number> {
        return this.matchRepository.buildToInsertMatches(matches, ctx);
    }
    getTeamByTournament(tournament: string): Promise<Team[]> {
        return this.teamRepository.getTeamByTournament(tournament);
    }
    getRoundByTournament(tournament: string): Promise<Round[]> {
        return this.roundRepository.getRoundByTournament(tournament);
    }
    getTournamentById(id: string): Promise<Tournament[]> {
        return this.tournamentRepository.getTournamentById(id);
    }
    buildToInsertRound(rounds: Round[], ctx?: any): Promise<number> {
        return this.roundRepository.buildToInsertRound(rounds, ctx);
    }
    updateTournament(tournament: Tournament, ctx?: any): Promise<number> {
        return this.tournamentRepository.updateTournament(tournament, ctx);
    }
    updateSeasonTournament(
        tournament: Tournament,
        newSeason: Season[],
        ctx?: any
    ): Promise<number> {
        return this.tournamentRepository.updateSeasonTournament(
            tournament,
            newSeason,
            ctx
        );
    }
    getAllTournament(): Promise<Tournament[]> {
        return this.tournamentRepository.getAllTournament();
    }
    createTournament(tournament: Tournament, ctx?: any): Promise<number> {
        return this.tournamentRepository.createTournament(tournament, ctx);
    }

    createStandings(standings: Standings, ctx?: any): Promise<number> {
        return this.standingsRepository.createStandings(standings, ctx);
    }
    createSeason(season: Season, ctx?: any): Promise<number> {
        return this.seasonRepository.createSeason(season, ctx);
    }
}
export function useTournamentService(
    db: DB,
    mapper?: TemplateMap
): TournamentService {
    const query = useQuery("tournaments", mapper, tournamentModel, true);
    const builder = new SearchBuilder<Tournament, TournamentFilter>(
        db.query,
        "tournaments",
        tournamentModel,
        postgres,
        query
    );

    const tournamentRepository = new SqlTournamentRepository(db);
    const roundRepository = new SqlRoundRepository(db);
    const matchRepository = new SqlMatchRepository(db);
    const teamRepository = new SqlTeamRepository(db);
    const standingsRepository = new SqlStandingsRepository(db);
    const seasonRepository = new SqlSeasonRepository(db);

    return new TournamentManager(
        builder.search,
        tournamentRepository,
        roundRepository,
        matchRepository,
        teamRepository,
        standingsRepository,
        seasonRepository
    );
}
export function useTournamentController(
    log: Log,
    db: DB,
    mapper?: TemplateMap
): TournamentController {
    return new TournamentController(log, useTournamentService(db, mapper));
}
