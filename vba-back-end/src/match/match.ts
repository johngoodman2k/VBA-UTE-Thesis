import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
// import { Player } from "../player/player";
import { Team } from "../team/team";

export interface Match {
  id: string;
  tournamentId: string;
  round: string;
  home: Team;
  away: Team;
  homeResult: string;
  awayResult: string;
  createdAt: Date;
  matchDay: Date;
  referee?: string;
  spectators?: string;
  assistance?: Player;
  process?: Process[];
  endmatch: boolean;
}

interface Process {
  type: string;
  mins: string;
  player: Player[];
  cardcolor: string;
  side: string;
}
interface Player {
  name: string;
  image: string;
  shirtNumber: number;
}

export interface MatchRepository extends Repository<Match, string> {
  getMatches(tournamentId: string, round: string): Promise<Match[]>;
}

export interface MatchService extends Service<Match, string, MatchFilter> {
  getMatches(tournamentId: string, round: string): Promise<Match[]>;
}

export const matchModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  tournamentId: {
    required: true,
  },
  round: {
    required: true,
  },
  home: {
    required: true,
  },
  away: {
    required: true,
  },
  homeResult: {},
  awayResult: {},
  createdAt: {
    type: "datetime",
  },
  matchDay: {},
  assistance: {},
  process: {},
  endmatch: {},
};

export interface MatchFilter extends Filter {
  id: string;
  tournamentId: string;
  round: string;
  home: Team;
  away: Team;
  homeResult: string;
  awayResult: string;
  createdAt: Date;
  matchDay: Date;
  referee?: string;
  spectators?: string;
  assistance?: string;
  process?: string;
  endmatch: boolean;
}
