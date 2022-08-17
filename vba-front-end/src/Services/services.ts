import axios from "axios";
import { HttpRequest } from "axios-core";
import { MatchServices, TeamServices, TournamentServices } from ".";
import {
  MatchServicesRoot,
  TeamServicesRoot,
  TournamentServicesRoot,
} from "./servicesroot";

const httpRequest = new HttpRequest(axios);
class VbaContext {
  public tournamentServices?: TournamentServicesRoot;
  public matchServices?: MatchServicesRoot;
  public teamServices?: TeamServicesRoot;

  getTournamentServices(): TournamentServicesRoot {
    if (!this.tournamentServices) {
      this.tournamentServices = new TournamentServices(
        "http://localhost:8080/tournaments",
        httpRequest
      );
    }
    return this.tournamentServices;
  }
  getMatchServices(): MatchServicesRoot {
    if (!this.matchServices) {
      this.matchServices = new MatchServices(
        "http://localhost:8080/matchs",
        httpRequest
      );
    }
    return this.matchServices;
  }

  getTeamServices(): TeamServicesRoot {
    if (!this.teamServices) {
      this.teamServices = new TeamServices(
        "http://localhost:8080/teams",
        httpRequest
      );
    }
    return this.teamServices;
  }
}
export const vbaContext = new VbaContext();
