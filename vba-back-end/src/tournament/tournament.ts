import { Attributes, DateRange, Filter, Repository, Service } from 'onecore';
import { nanoid } from 'nanoid';

export interface Tournament {
	id: string;
	name: string;
	description: string;
	startDate?: Date;
	endDate?: Date;
	type: string;
	competitor: string;
	seasons: Season[];
	createdAt: Date;
}
export interface Season {
	id?: string;
	name?: string;
	status?: string;
	rounds?: Round[];
	standingsId?: string;
	teams?: Team[];
	tournamentId?: string;
	createdAt?: Date;
}

export interface Match {
	id: string;
	tournamentId: string;
	round: string;
	home: string | Team;
	away: string | Team;
	homeResult: number;
	awayResult: number;
	matchDay: Date;
	endmatch: boolean;
	createdAt: Date;
}

export interface Team {
	id: string;
	teamName: string;
	teamLogo: string;
	stadiumname?: string;
	stadiumpic?: string;
	description?: string;
	status?: string;
	eliminated?: boolean;
	shortName: string;
	seasonId: string;
	players: Player[];
	createdAt: Date;
}

export interface Player {
	id: string;
	lastName: string;
	firstName: string;
	dateOfBirth: Date;
	image: string;
	shirtNumber: number;
	scored: number;
	createdAt: Date;
}

export interface Round {
	id: string;
	roundname: string;
	tournamentId: string;
	matches: Match[];
	createdAt: Date;
}

export interface Standings {
	id: string;
	seasonId: string;
	statistics: Statistics[];
	createdAt: Date;
}

interface Statistics {
	teamId: string;
	played?: number;
	won?: number;
	drawn?: number;
	lost?: number;
	home?: Point;
	road?: Point;
	matchResult: number[];
}

interface Point {
	won: number;
	lost: number;
}

export interface TournamentRepository extends Repository<Tournament, string> {
	getTournamentById(id: string): Promise<Tournament[]>;
	updateSeasonTournament(tournament: Tournament, newSeason: Season[], ctx?: any): Promise<number>;
	getAllTournament(): Promise<Tournament[]>;
	createTournament(tournament: Tournament, ctx?: any): Promise<number>;
	createSeasonAndAddToTournament(season: Season, tournament: Tournament, standings: Standings): Promise<number>;
	createGenerate(matches: Match[],rounds:Round[],season:Season):Promise<number>;
	getMergeTournamentById(tournamentId: string,seasonId:string):Promise<Season[]>;
}
export interface MatchRepository extends Repository<Match, string> {
	buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;
	getMatchesBySeasonId(matchId:string):Promise<Match[]>;
	getMatchesByRoundId(roundId:string):Promise<Match[]>;
}

export interface RoundRepository extends Repository<Round, string> {
	getRoundBySeasonId(seasonId: string): Promise<Round[]>
	saveRound(roud: Round): Promise<number>;
	buildToInsertRound(rounds: Round[], ctx?: any): Promise<number>;
	getRoundById(id:string):Promise<Round>;
	getRoundPlayOff():Promise<Round[]>;
	updateRound(round:Round):Promise<number>;
}
export interface TeamRepository extends Repository<Team, string> {
	getTeamAndSortWon(seasonId: string):Promise<Team[]>;
	getTeamByTournament(tournament: string): Promise<Team[]>;
    getTeamBySeasonId(seasonId: string):Promise<Team[]>
}
export interface StandingsRepository extends Repository<Standings, string> {}
export interface SeasonRepository extends Repository<Season, string> {
	getSeasonById(id: string): Promise<Season[]>;
}
export interface TournamentService extends Service<Tournament, string, TournamentFilter> {
	buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;
	buildToInsertRound(rounds: Round[], ctx?: any): Promise<number>;

	getRoundBySeasonId(seasonId: string): Promise<Round[]>;
	getTeamByTournament(tournament: string): Promise<Team[]>;
	getTournamentById(id: string): Promise<Tournament[]>;

	updateSeasonTournament(tournament: Tournament, newSeason: Season[], ctx?: any): Promise<number>;

	getAllTournament(): Promise<Tournament[]>;
	createTournament(tournament: Tournament, ctx?: any): Promise<number>;

	getSeasonById(id: string): Promise<Season[]>;
	createSeasonAndAddToTournament(season: Season, tournament: Tournament, standings: Standings): Promise<number>;
	getTeamBySeasonId(seasonId: string):Promise<Team[]>;
	createGenerate(matches: Match[],rounds:Round[],season:Season):Promise<number>;
	getMergeTournamentById(tournamentId: string,seasonId:string):Promise<Season[]>;
	getMatchesBySeasonId(matchId:string):Promise<Match[]>;
	getTeamAndSortWon(seasonId: string):Promise<Team[]>;
	getRoundById(id:string):Promise<Round>;
	getMatchesByRoundId(roundId:string):Promise<Match[]>;
	getRoundPlayOff():Promise<Round[]>;
	updateRound(round:Round):Promise<number>;
}

export const tournamentModel: Attributes = {
	id: {
		key: true,
		match: 'equal',
		type: 'string',
		default: nanoid()
	},
	name: {
		type: 'string',
		required: true
	},
	description: { type: 'string' },
	startDate: {
		type: 'datetime'
	},
	endDate: { type: 'datetime' },
	type: { type: 'string' },
	competitor: { type: 'string' },
	seasons: { type: 'array' },
	createdAt: { type: 'datetime' }
};

export interface TournamentFilter extends Filter {
	id: string;
	name: string;
	description: string;
	startDate?: string;
	endDate?: string;
	type: string;
	competitor: string;
	seasons: Season[];
	createdAt: Date;
}
