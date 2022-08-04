import { Attributes, Filter, Repository, Service } from "onecore";
import { Team } from "../team/team";

export interface Player {
  id: string;
  name: string;
  dateOfBirth: Date;
  image: string;
  shirtNumber: string;
  createdAt: Date;
  teams: Team[];
  card: Card;
}

interface Card {
  red: string;
  yellow: string;
}
export interface PlayerFilter extends Filter {
  id: string;
  name: string;
  dateOfBirth: Date;
}
export interface PlayerRepository extends Repository<Player, string> {}
export interface PlayerService extends Service<Player, string, PlayerFilter> {}
export const PlayerModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  name: {},
  dateOfBirth: { type: "datetime" },
  image: {},
  shirtNumber: {},
  createdAt: { type: "datetime" },
  teams: {},
  card: {},
};
