import { Attributes, DateRange, Filter, Repository, Service } from 'onecore';

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
	matchResult: number[];
}

interface Point {
	won: number;
	lost: number;
}

interface Team {
	name: string;
	logo: string;
}
// interface Match {
//     home: Team;
//     away: Team;
//     homResult: number;
//     awayresult: number;
//     matchDay: boolean;
// }

export interface StandingsRepository extends Repository<Standings, string> {
	//   getTeamByTournamentId(tournamentId: string): Promise<Standings[]>;
	getStangdingsBySeasonId(seasonId:string):Promise<Standings[]>;
}

export interface StandingsService extends Service<Standings, string, StandingsFilter> {
	//   getTeamByTournamentId(tournamentId: string): Promise<Standings[]>;
	getStangdingsBySeasonId(seasonId:string):Promise<Standings[]>;
}

export const standingsModel: Attributes = {
	id: {
		key: true,
		match: 'equal'
	},
	seasonId: { required: true },
	statistics: { type: 'array' },
	createdAt: { type: 'datetime' }
};

export interface StandingsFilter extends Filter {
	id: string;
	tournamentId: string;
	statistics: Statistics[];
	createdAt: Date;
}
