import { Match, MatchProcess, Player, Post, Process, Result, Season, Standings, Team, Tournament, User } from './models';

export interface TournamentServicesRoot {
	getTournamentById(id: string | undefined, globalHost?: string): Promise<Tournament>;
	getAllTournament(): Promise<Tournament[]>;
	createTournament(tournament: Tournament): Promise<Result<Tournament>>;
	createSeasonAndAddToTournament(name: string, tournamentId: string): Promise<Result<Tournament[]>>;
	updateTournament(id: string, tournament: Tournament): Promise<number>;
	getMergeTournamentById(tournamentId: string, seasonId: string): Promise<Season[]>
	GetGeneratedMatches(tournamentId: string, seasonId: string): Promise<number>;

}

export interface MatchServicesRoot {
	getMatchDetailsById(id: string | undefined, globalHost?: string): Promise<Match>;
	patchMatchDetailsById(
		id: string | undefined,
		obj: Match | Process | Date | MatchProcess,
		globalHost?: string
	): Promise<Match>;
	addProcessToMatch(process: Process, globalHost?: string): Promise<Process>;
	updateProcess(id: string | undefined, process: Process, globalHost?: string): Promise<Process>;
	getMatchDetails(matchId: string): Promise<Match>;
	updateMatch(matchId: string, match: Match): Promise<Match>;
}

export interface TeamServicesRoot {
	getPlayersByTeamId(id: string | undefined, globalHost?: string): Promise<Team>;
	getAllTeams(): Promise<Team[]>;
	getTeamById(id: string, globalHost?: string): Promise<Team>;
	addPlayerToTeam(player: Player, globalHost?: string): Promise<number>;
	getTeamsBySeasonId(seasonId: string, globalHost?: string): Promise<Team[]>;
	updateTeam(id: string, team: Team): Promise<Team>;
}

export interface PlayerServicesRoot {
	getPlayersByTeamId(id: string | undefined, globalHost?: string): Promise<Player[]>;
	getPlayerById(id: string | undefined): Promise<Player>;
	getAllPlayers(): Promise<Player[]>;
	updatePlayer(id: string, player: Player): Promise<Number>;
}

export interface ProcessServicesRoot {
	getProcessById(id: string | undefined, globalHost?: string): Promise<Process[]>;
	getProcessesByMatchId(matchId: string): Promise<Process[]>;
}

export interface StandingsServicesRoot {
	getStandingsById(id: string | undefined, globalHost?: string): Promise<Standings>;
}

export interface AuthenticateServicesRoot {
	signUpApi(user: User): Promise<Result<User>>;
	signInApi(user: User): Promise<Result<User>>;
}
export interface SeasonServicesRoot {
	getAllSeason(): Promise<Season[]>;
	getSeasonById(id: string): Promise<Season>;
	getSeasonByTournamentId(tournamentId: string): Promise<Season[]>;
	createTeamAndAddTeamToSeason(team: Team, seasonId: string): Promise<Result<Season[]>>
	updateSeason(id: string, season: Season): Promise<Result<Season>>

}

export interface PostServicesRoot {
	getAllPost(): Promise<Post[]>;
	getPostById(id: string): Promise<Post>
	createPost(post: Post): Promise<number>;

}
