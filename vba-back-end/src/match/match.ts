import { Attributes, DateRange, Filter, Repository, Service } from 'onecore';
// import { Player } from "../player/player";
import { Team } from '../team/team';

export interface Match {
	id: string;
	tournamentId: string;
	round: string;
	home: Team;
	away: Team;
	homeResult: string;
	awayResult: string;
	createdAt: Date;
	matchDay: Date;
	referee: string;
	spectators: string;
	assistance: Player;
	process: Process[];
	endmatch: boolean;
}

export interface Process {
	id: string;
	type: string;
	mins: string;
	quater: string;
	player: Player[];
	cardcolor: string;
	side: string;
	match: string;
	option: string;
	description: string;
	createdAt: Date;
}
interface Player {
	name: string;
	image: string;
	shirtNumber: number;
}

export interface MatchRepository extends Repository<Match, string> {
	getMatches(tournamentId: string, round: string): Promise<Match[]>;
	updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]>;
	getMatchById(matchId: string): Promise<Match[]>;
}
export interface ProcessRepository extends Repository<Process, string> {
	addProcess(process: Process[], ctx?: any): Promise<number>;
	getProcessById(processId: string): Promise<Process[]>;
	updateProcess(process: Process, ctx?: any): Promise<number>;
}

export interface MatchService extends Service<Match, string, MatchFilter> {
	getMatches(tournamentId: string, round: string): Promise<Match[]>;
	updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]>;
	addProcess(process: Process[], ctx?: any): Promise<number>;
	getMatchById(matchId: string): Promise<Match[]>;
	getProcessById(processId: string): Promise<Process[]>;
	updateProcess(process: Process, ctx?: any): Promise<number>;
}

export const matchModel: Attributes = {
	id: {
		key: true,
		match: 'equal'
	},
	tournamentId: {
		type: 'string'
	},
	round: {
		type: 'string'
	},
	home: {
		type: 'string'
	},
	away: {
		type: 'string'
	},
	homeResult: {},
	awayResult: {},
	createdAt: {
		type: 'datetime'
	},
	matchDay: {},
	referee: { type: 'string' },
	spectators: { type: 'object' },
	assistance: { type: 'object' },
	process: { type: 'array' },
	endmatch: {}
};

export interface MatchFilter extends Filter {
	id: string;
	tournamentId: string;
	round: string;
	home: Team;
	away: Team;
	homeResult: string;
	awayResult: string;
	createdAt: Date;
	matchDay: Date;
	referee: string;
	spectators: string;
	assistance: string;
	process: Process[];
	endmatch: boolean;
}
