import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Team {
  id: string;
  teamname: string;
  teamlogo: string;
  stadiumname: string;
  stadiumpic: string;
  description: string;
  status: string;
  color: string;
  tournamentId: string;
  eliminated: boolean;
  createdAt: Date;
}

export interface TeamRepository extends Repository<Team, string> {
  getTeamByTournamentId(tournamentId: string): Promise<Team[]>;
}

export interface TeamService extends Service<Team, string, TeamFilter> {
  getTeamByTournamentId(tournamentId: string): Promise<Team[]>;
}

export const teamModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  teamname: {
    required: true,
  },
  teamlogo: {},
  stadiumname: {},
  stadiumpic: {},
  description: {},
  status: {},
  color: {},
  tournamentId: {},
  eliminated: {
    default: false,
  },
  createdAt: { type: "datetime" },
};

export interface TeamFilter extends Filter {
  id: string;
  teamname: string;
  teamlogo: string;
  stadiumname: string;
  stadiumpic: string;
  description: string;
  status: string;
  color: string;
  tournamentId: string;
  eliminated: boolean;
  createdAt: Date;
}
