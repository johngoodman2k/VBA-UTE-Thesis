import { Attributes, DateRange, Filter, Repository, Service } from 'onecore';
import { Statement } from 'pg-extension';
// import { Player } from "../player/player";
export interface Season {
	id: string;
	name: string;
	status: string;
	rounds: Round[];
	standingsId: string;
	teams: Team[];
	tournamentId: string;
	createdAt: Date;
}

export interface Round {
	id: string;
	roundname: string;
	tournamentId: string;
	matches: Match[];
	createdAt: Date;
}

export interface Match {
	id: string;
	tournamentId: string;
	round: string;
	home: Team;
	away: Team;
	homeResult: number;
	awayResult: number;
	matchDay: Date;
	endmatch: boolean;
	createdAt: Date;
}

export interface Team {
	id?: string;
	teamName?: string;
	teamLogo?: string;
	stadiumname?: string;
	stadiumpic?: string;
	description?: string;
	status?: string;
	color?: string;
	seasonId?: string;
	players?: Player[];
	eliminated?: boolean;
	shortName?: string;
	createdAt?: Date;
}

export interface Player {
	id: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	image: string;
	shirtNumber: number;
	createdAt: Date;
	teams: Team;
}

export interface Tournament {
	id: string;
	name: string;
	description: string;
	startDate?: string;
	endDate?: string;
	type: string;
	status: string;
	createdAt: Date;
}

export interface Standings {
	id: string;
	seasonId: string;
	statistics: Statistics[];
	createdAt: Date;
}

interface Statistics {
	teamId?: string;
	played?: number;
	won?: number;
	drawn?: number;
	lost?: number;
	home?: Point;
	road?: Point;
}

interface Point {
	won: number;
	lost: number;
}

export interface SeasonRepository extends Repository<Season, string> {
	getSeasonById(seasonId: string): Promise<Season[]>;
	// updateSeason(season: Season, ctx?: any): Statement;
	getSeasonByTournamentId(tournamentId: string): Promise<Season[]>;
	createTeamAndAddTeamToSeason(team: Team, season: Season, standings: Standings): Promise<number>;
}

export interface TeamRepository extends Repository<Team, string> {
	// createTeam(team: Team, ctx?: any): Statement;
}

export interface StandingsRepository extends Repository<Standings, string> {
	getStandingsById(id: string): Promise<Standings[]>;
	// updateStandings(stangdings: Standings, ctx?: any): Statement;
}

export interface SeasonService extends Service<Season, string, SeasonFilter> {
	// createTeam(team: Team, ctx?: any): Statement;
	getSeasonById(seasonId: string): Promise<Season[]>;
	// updateSeason(season: Season, ctx?: any): Statement;
	getStandingsById(id: string): Promise<Standings[]>;
	// updateStandings(stangdings: Standings, ctx?: any): Statement;
	getSeasonByTournamentId(tournamentId: string): Promise<Season[]>;
	createTeamAndAddTeamToSeason(team: Team, season: Season, standings: Standings): Promise<number>;
}

export const seasonModel: Attributes = {
	id: {
		key: true,
		match: 'equal',
		type: 'string'
	},
	name: {
		type: 'string'
	},
	status: {
		type: 'string'
	},
	rounds: {
		type: 'array'
	},
	standingsId: {
		column: 'standingsid',
		type: 'string'
	},
	teams: {
		type: 'array'
	},
	tournamentId: {
		column: 'tournamentid',
		type: 'string'
	},
	createdAt: { type: 'datetime' }
};

export interface SeasonFilter extends Filter {
	id: string;
	name: string;
	status: string;
	rounds: Round[];
	standingsId: string;
	team: Team[];
	tournamentId: string;
	createdAt: Date;
}
