import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Standings {
  id: string;
  seasonId: string;
  statistics: Statistics[];
  createdAt: Date;
}

interface Statistics {
  team: Team;
  played: string;
  won: string;
  drawn: string;
  lost: string;
  goalsFor: string;
  goalsAgainst: string;
  goalsDifference: string;
  points: string;
  form: Match[];
}
interface Team {
  name: string;
  logo: string;
}
interface Match {
  home: Team;
  away: Team;
  homResult: string;
  awayresult: string;
  matchDay: string;
}

export interface StandingsRepository extends Repository<Standings, string> {
  //   getTeamByTournamentId(tournamentId: string): Promise<Standings[]>;
}

export interface StandingsService
  extends Service<Standings, string, StandingsFilter> {
  //   getTeamByTournamentId(tournamentId: string): Promise<Standings[]>;
}

export const standingsModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  seasonId: { required: true },
  statistics: { type: "array" },
  createdAt: { type: "datetime" },
};

export interface StandingsFilter extends Filter {
  id: string;
  tournamentId: string;
  statistics: Statistics[];
  createdAt: Date;
}
