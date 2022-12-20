import { HttpRequest } from 'axios-core';
import { Match, Tournament, Process, Team, Player, MatchProcess, Result, User, Standings, Season } from './models';
import {
	AuthenticateServicesRoot,
	MatchServicesRoot,
	PlayerServicesRoot,
	ProcessServicesRoot,
	SeasonServicesRoot,
	StandingsServicesRoot,
	TeamServicesRoot,
	TournamentServicesRoot
} from './servicesroot';

export class TournamentServices implements TournamentServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.getTournamentById = this.getTournamentById.bind(this);
		this.getAllTournament = this.getAllTournament.bind(this);
		this.createTournament = this.createTournament.bind(this);
		this.createSeasonAndAddToTournament = this.createSeasonAndAddToTournament.bind(this);
		this.getMergeTournamentById = this.getMergeTournamentById.bind(this);

	}

	getTournamentById(id: string | undefined, globalHost?: string): Promise<Tournament> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.get<Tournament>(url);
	}
	getAllTournament(): Promise<Tournament[]> {
		const url = `${this.url}/getall`;
		return this.httpRequest.get<Tournament[]>(url);
	}
	createTournament(tournament: Tournament): Promise<Result<Tournament>> {
		const url = `${this.url}`;
		return this.httpRequest.post<Result<Tournament>>(url, tournament);
	}
	createSeasonAndAddToTournament(name:string,tournamentId:string):Promise<Result<Tournament[]>>{
		const url = `${this.url}/createSeasonAndAddToTournament`;
		return this.httpRequest.post<Result<Tournament[]>>(url, {name:name,tournamentId:tournamentId});
	}
	updateTournament(id:string,tournament:Tournament): Promise<number>{
		const url = `${this.url}/${id}`;
		return this.httpRequest.put(url, tournament);
	}
	getMergeTournamentById(tournamentId:string, seasonId:string): Promise<Tournament[]>{
		const url = `${this.url}/getMergeTournamentById/${tournamentId}/${seasonId}`;
		return this.httpRequest.get<Tournament[]>(url);
	}

}

export class MatchServices implements MatchServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.getMatchDetailsById = this.getMatchDetailsById.bind(this);
		this.patchMatchDetailsById = this.patchMatchDetailsById.bind(this);
		this.addProcessToMatch = this.addProcessToMatch.bind(this);
		this.updateProcess = this.updateProcess.bind(this);
		this.getMatchDetails = this.getMatchDetails.bind(this);

	}

	getMatchDetailsById(id: string | undefined, globalHost?: string): Promise<Match> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.get<Match>(url);
	}
	patchMatchDetailsById(
		id: string | undefined,
		obj: Match | Process | Date | MatchProcess,
		globalHost?: string
	): Promise<Match> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.patch<Match>(url, obj);
	}

	addProcessToMatch(id: string, process: Process[], globalHost?: string): Promise<Process> {
		const url = `${this.url}/addProcessToMatch/${id}`;
		return this.httpRequest.post<Process>(url, process);
	}
	updateProcess(id: string, process: Process, globalHost?: string): Promise<Process> {
		const url = `${this.url}/updateProcess/${id}`;
		return this.httpRequest.post<Process>(url, process);
	}
	getMatchDetails(matchId:string):Promise<Match>{
		const url = `${this.url}/getMatchDetails/${matchId}`;
		return this.httpRequest.get<Match>(url);
	}

}

export class TeamServices implements TeamServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
		this.getAllTeams = this.getAllTeams.bind(this);
		this.getTeamById = this.getTeamById.bind(this);
		this.addPlayerToTeam = this.addPlayerToTeam.bind(this);
		this.updateTeam = this.updateTeam.bind(this);

		
	}

	getAllTeams(): Promise<Team[]> {
		const url = `${this.url}/search`;
		return this.httpRequest.get<Team[]>(url);
	}
	getTeamById(id: string, globalHost?: string): Promise<Team> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.get<Team>(url);
	}

	getPlayersByTeamId(id: string | undefined, globalHost?: string): Promise<Team> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.get<Team>(url);
	}

	addPlayerToTeam(player: Player, globalHost?: string): Promise<number> {
		const url = `${this.url}/addPlayerToTeam`;
		return this.httpRequest.post(url, player,{headers: {'Content-Type': 'multipart/form-data'}});
	}
	getTeamsBySeasonId(seasonId: string, globalHost?: string): Promise<Team[]>{
		const url = `${this.url}/getTeamsBySeasonId/${seasonId}`;
		return this.httpRequest.get<Team[]>(url)
	}
	updateTeam(id:string,team:Team):Promise<Team>{
		const url = `${this.url}/${id}`;
		return this.httpRequest.put<Team>(url,team,{headers: {'Content-Type': 'multipart/form-data'}})
	}

}

export class PlayerServices implements PlayerServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
		this.getPlayerById = this.getPlayerById.bind(this);
		this.getAllPlayers = this.getAllPlayers.bind(this);
		this.updatePlayer = this.updatePlayer.bind(this);
		
	}

	getPlayersByTeamId(teamid: string | undefined, globalHost?: string): Promise<Player[]> {
		const url = `${this.url}/getplayersbyteamid/${teamid}`;
		return this.httpRequest.get<Player[]>(url);
	}

	getPlayerById(id: string | undefined): Promise<Player> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.get<Player>(url);
	}
	getAllPlayers(): Promise<Player[]>{
		const url = `${this.url}/getall`;
		return this.httpRequest.get<Player[]>(url);
	}
	updatePlayer(id:string,player:Player): Promise<Number>{
		const url = `${this.url}/${id}`;
		return this.httpRequest.put(url,player,{headers: {'Content-Type': 'multipart/form-data'}});
	}

}

export class ProcessServices implements ProcessServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.getProcessById = this.getProcessById.bind(this);
		this.getProcessesByMatchId = this.getProcessesByMatchId.bind(this);
	}

	getProcessById(id: string | undefined, globalHost?: string | undefined): Promise<Process[]> {
		const url = `${this.url}/process/${id}`;
		return this.httpRequest.get<Process[]>(url);
	}
	getProcessesByMatchId(matchId:string):Promise<Process[]> {
		const url = `${this.url}/getProcessesByMatchId/${matchId}`;
		return this.httpRequest.get<Process[]>(url);
	}
}

export class AuthenticateServices implements AuthenticateServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.signUpApi = this.signUpApi.bind(this);
		this.signInApi = this.signInApi.bind(this);
	}
	signUpApi(user: User): Promise<Result<User>> {
		const url = `${this.url}/signUp`;
		return this.httpRequest.post<Result<User>>(url, user);
	}
	signInApi(user: User): Promise<Result<User>> {
		const url = `${this.url}/signIn`;
		return this.httpRequest.post<Result<User>>(url, user);
	}
}

export class StandingsServices implements StandingsServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.getStandingsById = this.getStandingsById.bind(this);
	}
	getStandingsById(id: string | undefined, globalHost?: string): Promise<Standings> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.get<Standings>(url);
	}
}

export class SeasonServices implements SeasonServicesRoot {
	constructor(private url: string, private httpRequest: HttpRequest) {
		this.getAllSeason = this.getAllSeason.bind(this);
	}
	getAllSeason(): Promise<Season[]> {
		const url = `${this.url}/search`;
		return this.httpRequest.get<Season[]>(url);
	}
	getSeasonById(id: string): Promise<Season> {
		const url = `${this.url}/${id}`;
		return this.httpRequest.get<Season>(url);
	}
	getSeasonByTournamentId(tournamentId: string): Promise<Season[]> {
		const url = `${this.url}/getSeasonByTournamentId/${tournamentId}`;
		return this.httpRequest.get<Season[]>(url);
	}
	createTeamAndAddTeamToSeason(team: Team,seasonId:string):Promise<Result<Season[]>>{
		const url = `${this.url}/createTeamAndAddTeamToSeason`;
		return this.httpRequest.post<Result<Season[]>>(url, team,{headers: {'Content-Type': 'multipart/form-data'}});
	}
	updateSeason(id:string,season:Season):Promise<Result<Season>>{
		const url = `${this.url}/${id}`;
		return this.httpRequest.put<Result<Season>>(url,season)
	}

}
