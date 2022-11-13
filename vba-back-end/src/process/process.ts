import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
// import { Player } from "../player/player";
import { Team } from "../team/team";

export interface Process {
  id: string;
  type: string;
  mins: number;
  quater: string;
  player: Player[];
  cardcolor: string;
  side: string;
  match: string;
  option: string;
  description: string;
  createdAt: Date;
}
interface Player {
  firstName: string;
  lastName: string;
  image: string;
  shirtNumber: number;
}

export interface ProcessRepository extends Repository<Process, string> {
  getMatches(tournamentId: string, round: string): Promise<Process[]>;
}

export interface ProcessService
  extends Service<Process, string, ProcessFilter> {
  getMatches(tournamentId: string, round: string): Promise<Process[]>;
}

export const processModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  type: { type: "string" },
  mins: { type: "number" },
  quater: { type: "string" },
  player: { type: "array" },
  cardcolor: { type: "string" },
  side: { type: "string" },
  match: { type: "string" },
  option: { type: "string" },
  description: { type: "string" },
  createdAt: { type: "datetime" },
};

export interface ProcessFilter extends Filter {
  id: string;
  type: string;
  mins: number;
  quater: string;
  player: Player[];
  cardcolor: string;
  side: string;
  match: string;
  option: string;
  description: string;
  createdAt: Date;
}