import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import {
    Season,
    SeasonFilter,
    seasonModel,
    SeasonRepository,
    SeasonService,
    Standings,
    StandingsRepository,
    Team,
    TeamRepository,
} from "./season";
import { SeasonController } from "./season-controller";
export * from "./season";
export { SeasonController };
import { SqlSeasonRepository } from "./sql-season-repository";
import { SqlTeamRepository } from "./sql-team-repository";
import { SqlStandingsRepository } from "./sql-standings-repository";

export class SeasonManager
    extends Manager<Season, string, SeasonFilter>
    implements SeasonService
{
    constructor(
        search: Search<Season, SeasonFilter>,
        protected seasonRepository: SeasonRepository,
        protected teamRepository: TeamRepository,
        protected standingsRepository: StandingsRepository
    ) {
        super(search, seasonRepository);
    }
    createTeam(team: Team, ctx?: any): Promise<number> {
        return this.teamRepository.createTeam(team, ctx);
    }
    getSeasonById(seasonId: string): Promise<Season[]> {
        return this.seasonRepository.getSeasonById(seasonId);
    }
    updateSeason(season: Season, ctx?: any): Promise<number> {
        return this.seasonRepository.updateSeason(season, ctx);
    }
    getStandingsById(id: string): Promise<Standings[]> {
        return this.standingsRepository.getStandingsById(id);
    }
    updateStandings(stangdings: Standings, ctx?: any): Promise<number> {
        return this.standingsRepository.updateStandings(stangdings, ctx);
    }
}
export function useSeasonService(db: DB): SeasonService {
    const builder = new SearchBuilder<Season, SeasonFilter>(
        db.query,
        "seasons",
        seasonModel,
        postgres
    );
    const seasonRepository = new SqlSeasonRepository(db);
    const teamRepository = new SqlTeamRepository(db);
    const standingsRepository = new SqlStandingsRepository(db);

    return new SeasonManager(
        builder.search,
        seasonRepository,
        teamRepository,
        standingsRepository
    );
}
export function useSeasonController(log: Log, db: DB): SeasonController {
    return new SeasonController(log, useSeasonService(db));
}
