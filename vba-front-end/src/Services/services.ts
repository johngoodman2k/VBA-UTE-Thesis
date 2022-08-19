import axios from "axios";
import { HttpRequest } from "axios-core";
import {
  MatchServices,
  PlayerServices,
  TeamServices,
  TournamentServices,
} from ".";
import {
  MatchServicesRoot,
  PlayerServicesRoot,
  TeamServicesRoot,
  TournamentServicesRoot,
} from "./servicesroot";

const httpRequest = new HttpRequest(axios);
class VbaContext {
  public tournamentServices?: TournamentServicesRoot;
  public matchServices?: MatchServicesRoot;
  public teamServices?: TeamServicesRoot;
  public playerServices?: PlayerServicesRoot;

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
        "http://localhost:8080/matches",
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

  getPlayerServices(): PlayerServicesRoot {
    if (!this.playerServices) {
      this.playerServices = new PlayerServices(
        "http://localhost:8080/players",
        httpRequest
      );
    }
    return this.playerServices;
  }
}
export const vbaContext = new VbaContext();
