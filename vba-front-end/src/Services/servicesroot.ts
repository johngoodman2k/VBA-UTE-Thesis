import {
	Match,
	MatchProcess,
	Player,
	Process,
	Team,
	Tournament
} from './models';

export interface TournamentServicesRoot {
	getTournamentById(id: string, globalHost?: string): Promise<Tournament>;
}

export interface MatchServicesRoot {
	getMatchDetailsById(
		id: string | undefined,
		globalHost?: string
	): Promise<Match>;
	patchMatchDetailsById(
		id: string | undefined,
		obj: Match | Process | Date | MatchProcess,
		globalHost?: string
	): Promise<Match>;
	addProcessToMatch(
		id: string | undefined,
		process: Process[],
		globalHost?: string
	): Promise<Process>;
	updateProcess(
		id: string | undefined,
		process: Process,
		globalHost?: string
	): Promise<Process>;
}

export interface TeamServicesRoot {
	getPlayersByTeamId(
		id: string | undefined,
		globalHost?: string
	): Promise<Team>;
}

export interface PlayerServicesRoot {
	getPlayersByTeamId(
		id: string | undefined,
		globalHost?: string
	): Promise<Player[]>;
	getPlayerById(id: string | undefined): Promise<Player>;
}

export interface ProcessServicesRoot {
	getProcessById(
		id: string | undefined,
		globalHost?: string
	): Promise<Process[]>;
}
