import { Attributes, Filter, Repository, Service } from "onecore";
// import { Team } from "../team/team";

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  image: string;
  shirtNumber: string;
  createdAt: Date;
  teams: Team[];
  card: Card;
}

export interface Team {
  id: string;
}

interface Card {
  red: string;
  yellow: string;
}
export interface PlayerFilter extends Filter {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  image: string;
  shirtNumber: string;
  createdAt: Date;
  teams: Team[];
  card: Card;
}
export interface PlayerRepository extends Repository<Player, string> {
  getPlayersByTeamId(teamId: Team): Promise<Player[]>;
}
export interface PlayerService extends Service<Player, string, PlayerFilter> {
  getPlayersByTeamId(teamId: Team): Promise<Player[]>;
}
export const playerModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  firstName: { type: "string" },
  lastName: { type: "string" },
  dateOfBirth: { type: "datetime" },
  image: { type: "string" },
  shirtNumber: { type: "string" },
  createdAt: { type: "datetime" },
  teams: { type: "array" },
  card: { type: "object" },
};
