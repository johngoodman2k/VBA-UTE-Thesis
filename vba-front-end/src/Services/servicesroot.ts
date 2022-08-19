import { Match, Player, Process, Team, Tournament } from "./models";

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
    obj: Match | Process | Date,
    globalHost?: string
  ): Promise<Match>;
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
}
