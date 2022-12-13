import { Match, MatchProcess, Player, Process, Result, Standings, Team, Tournament, User } from './models';

export interface TournamentServicesRoot {
	getTournamentById(id: string | undefined, globalHost?: string): Promise<Tournament>;
	getAllTournament(): Promise<Tournament[]>;
	createTournament(tournament: Tournament): Promise<Result<Tournament>>;
}

export interface MatchServicesRoot {
	getMatchDetailsById(id: string | undefined, globalHost?: string): Promise<Match>;
	patchMatchDetailsById(
		id: string | undefined,
		obj: Match | Process | Date | MatchProcess,
		globalHost?: string
	): Promise<Match>;
	addProcessToMatch(id: string | undefined, process: Process[], globalHost?: string): Promise<Process>;
	updateProcess(id: string | undefined, process: Process, globalHost?: string): Promise<Process>;
}

export interface TeamServicesRoot {
	getPlayersByTeamId(id: string | undefined, globalHost?: string): Promise<Team>;
	getAllTeams(): Promise<Team[]>;
	getTeamById(id: string, globalHost?: string): Promise<Team>;
	addPlayerToTeam(teamId: string, obj: Player, globalHost?: string): Promise<number>;
}

export interface PlayerServicesRoot {
	getPlayersByTeamId(id: string | undefined, globalHost?: string): Promise<Player[]>;
	getPlayerById(id: string | undefined): Promise<Player>;
}

export interface ProcessServicesRoot {
	getProcessById(id: string | undefined, globalHost?: string): Promise<Process[]>;
}

export interface StandingsServicesRoot {
	getStandingsById(id: string | undefined, globalHost?: string): Promise<Standings>;
}

export interface AuthenticateServicesRoot {
	signUpApi(user: User): Promise<Result<User>>;
	signInApi(user: User): Promise<Result<User>>;
}
