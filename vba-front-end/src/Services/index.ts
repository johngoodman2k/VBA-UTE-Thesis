import { HttpRequest } from "axios-core";
import { Match, Tournament, Process, Team, Player } from "./models";
import {
  MatchServicesRoot,
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
}

export class MatchServices implements MatchServicesRoot {
  constructor(private url: string, private httpRequest: HttpRequest) {
    this.getMatchDetailsById = this.getMatchDetailsById.bind(this);
    this.patchMatchDetailsById = this.patchMatchDetailsById.bind(this);
  }

  getMatchDetailsById(
    id: string | undefined,
    globalHost?: string
  ): Promise<Match> {
    const url = `${this.url}/${id}`;
    return this.httpRequest.get<Match>(url);
  }
  patchMatchDetailsById(
    id: string | undefined,
    obj: Match | Process | Date,
    globalHost?: string
  ): Promise<Match> {
    const url = `${this.url}/${id}`;
    return this.httpRequest.patch<Match>(url, obj);
  }
}

export class TeamServices implements TeamServicesRoot {
  constructor(private url: string, private httpRequest: HttpRequest) {
    this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
  }

  getPlayersByTeamId(
    id: string | undefined,
    globalHost?: string
  ): Promise<Team> {
    const url = `${this.url}/${id}`;
    return this.httpRequest.get<Team>(url);
  }
}
