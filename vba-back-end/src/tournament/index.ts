import { Log, Manager, Search } from 'onecore';
import { DB, postgres, SearchBuilder, buildToInsertBatch } from 'query-core';
import { TemplateMap, useQuery } from 'query-mappers';
import { SqlStandingsRepository } from './sql-standings-repository';
import { SqlMatchRepository } from './sql-match-repository';
import { SqlRoundRepository } from './sql-round-repository';
import { SqlTeamRepository } from './sql-team-repository';

export { TournamentController };
import { SqlTournamentRepository } from './sql-tournament-repository';
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
	TournamentService
} from './tournament';
import { TournamentController } from './tournament-controller';
import { SqlSeasonRepository } from './sql-season-repository';

export class TournamentManager extends Manager<Tournament, string, TournamentFilter> implements TournamentService {
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
	getRoundBySeasonId(seasonId: string): Promise<Round[]>{
		return this.roundRepository.getRoundBySeasonId(seasonId);
	}
	getTournamentById(id: string): Promise<Tournament[]> {
		return this.tournamentRepository.getTournamentById(id);
	}
	buildToInsertRound(rounds: Round[], ctx?: any): Promise<number> {
		return this.roundRepository.buildToInsertRound(rounds, ctx);
	}

	updateSeasonTournament(tournament: Tournament, newSeason: Season[], ctx?: any): Promise<number> {
		return this.tournamentRepository.updateSeasonTournament(tournament, newSeason, ctx);
	}
	getAllTournament(): Promise<Tournament[]> {
		return this.tournamentRepository.getAllTournament();
	}
	createTournament(tournament: Tournament, ctx?: any): Promise<number> {
		return this.tournamentRepository.createTournament(tournament, ctx);
	}

	getSeasonById(id: string): Promise<Season[]> {
		return this.seasonRepository.getSeasonById(id);
	}
	createSeasonAndAddToTournament(season: Season, tournament: Tournament, standings: Standings): Promise<number> {
		return this.tournamentRepository.createSeasonAndAddToTournament(season, tournament, standings);
	}
	getTeamBySeasonId(seasonId: string):Promise<Team[]>{
		return this.teamRepository.getTeamBySeasonId(seasonId);
	}
	createGenerate(matches: Match[],rounds:Round[],season:Season):Promise<number>{
		return this.tournamentRepository.createGenerate(matches,rounds,season);
	}
	getMergeTournamentById(tournamentId: string,seasonId:string):Promise<Season[]>{
		return this.tournamentRepository.getMergeTournamentById(tournamentId,seasonId);
	}
	getMatchesBySeasonId(matchId:string):Promise<Match[]>{
		return this.matchRepository.getMatchesBySeasonId(matchId);
	}
	getTeamAndSortWon(seasonId: string):Promise<Team[]>{
		return this.teamRepository.getTeamAndSortWon(seasonId)
	}
	getRoundById(id:string):Promise<Round>{
		return this.roundRepository.getRoundById(id)
	}
	getMatchesByRoundId(roundId:string):Promise<Match[]>{
		return this.matchRepository.getMatchesByRoundId(roundId)
	}
	getRoundPlayOff():Promise<Round[]>{
		return this.roundRepository.getRoundPlayOff()
	}
	updateMatch(matches: Match[]):Promise<number>{
		return this.matchRepository.updateMatch(matches)
	}

}
export function useTournamentService(db: DB, mapper?: TemplateMap): TournamentService {
	const query = useQuery('tournaments', mapper, tournamentModel, true);
	const builder = new SearchBuilder<Tournament, TournamentFilter>(
		db.query,
		'tournaments',
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
export function useTournamentController(log: Log, db: DB, mapper?: TemplateMap): TournamentController {
	return new TournamentController(log, useTournamentService(db, mapper));
}
