import { HttpRequest } from "axios-core";
import { Match, Tournament, Process, Team, Player, MatchProcess, Result, User, Standings } from "./models";
import {
    AuthenticateServicesRoot,
    MatchServicesRoot,
    PlayerServicesRoot,
    ProcessServicesRoot,
    StandingsServicesRoot,
    TeamServicesRoot,
    TournamentServicesRoot,
} from "./servicesroot";

export class TournamentServices implements TournamentServicesRoot {
    constructor(private url: string, private httpRequest: HttpRequest) {
        this.getTournamentById = this.getTournamentById.bind(this);
    }

    getTournamentById(id: string, globalHost?: string): Promise<Tournament> {
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
}

export class MatchServices implements MatchServicesRoot {
    constructor(private url: string, private httpRequest: HttpRequest) {
        this.getMatchDetailsById = this.getMatchDetailsById.bind(this);
        this.patchMatchDetailsById = this.patchMatchDetailsById.bind(this);
        this.addProcessToMatch = this.addProcessToMatch.bind(this);
        this.updateProcess = this.updateProcess.bind(this);
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
}

export class TeamServices implements TeamServicesRoot {
    constructor(private url: string, private httpRequest: HttpRequest) {
        this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
        this.getAllTeams = this.getAllTeams.bind(this);
        this.getTeamById = this.getTeamById.bind(this);
        this.addPlayerToTeam = this.addPlayerToTeam.bind(this);
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

    addPlayerToTeam(teamId: string, obj: Player, globalHost: string): Promise<number> {
        const url = `${this.url}/addplayertoteam/${teamId}`;
        return this.httpRequest.post(url, obj);
    }
}

export class PlayerServices implements PlayerServicesRoot {
    constructor(private url: string, private httpRequest: HttpRequest) {
        this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
        this.getPlayerById = this.getPlayerById.bind(this);
    }

    getPlayersByTeamId(teamid: string | undefined, globalHost?: string): Promise<Player[]> {
        const url = `${this.url}/getplayersbyteamid/${teamid}`;
        return this.httpRequest.get<Player[]>(url);
    }

    getPlayerById(id: string | undefined): Promise<Player> {
        const url = `${this.url}/${id}`;
        return this.httpRequest.get<Player>(url);
    }
}

export class ProcessServices implements ProcessServicesRoot {
    constructor(private url: string, private httpRequest: HttpRequest) {
        this.getProcessById = this.getProcessById.bind(this);
    }

    getProcessById(id: string | undefined, globalHost?: string | undefined): Promise<Process[]> {
        const url = `${this.url}/process/${id}`;
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
