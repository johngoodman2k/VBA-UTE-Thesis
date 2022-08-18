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
  tournaments: Tournament[];
  players: Player[];
  eliminated: boolean;
  shortname: string;
  createdAt: Date;
}

export interface Player {
  id: string;
  name: string;
  dateOfBirth: Date;
  image: string;
  shirtNumber: string;
  createdAt: Date;
  card: Card;
}

interface Card {
  red: string;
  yellow: string;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  type: string;
  status: string;
  createdAt: Date;
}

export interface TeamRepository extends Repository<Team, string> {
  getTeamByTournamentId(tournamentId: string): Promise<Team[]>;
}

export interface PlayerRepository extends Repository<Player, string> {
  addPlayer(player: Player, ctx?: any): Promise<number>;
}

export interface TeamService extends Service<Team, string, TeamFilter> {
  getTeamByTournamentId(tournamentId: string): Promise<Team[]>;
  addPlayer(player: Player, ctx?: any): Promise<number>;
}

export const teamModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  teamname: {
    required: true,
  },
  teamlogo: { type: "string" },
  stadiumname: { type: "string" },
  stadiumpic: { type: "string" },
  description: { type: "string" },
  status: { type: "string" },
  color: { type: "string" },
  tournament: { type: "array" },
  eliminated: {
    default: false,
    type: "boolean",
  },
  shortname: { type: "string" },
  players: { type: "array" },
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
  tournament: Tournament[];
  players: Player[];
  eliminated: boolean;
  shortname: string;
  createdAt: Date;
}
