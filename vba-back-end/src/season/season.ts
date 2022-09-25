import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
// import { Player } from "../player/player";
import { Team } from "../team/team";

export interface Season {
  id: string;
  name: string;
  status: string;
  rounds: Round[];
  standingsId: string;
  tournamentId: string;
  createdAt: Date;
}

export interface Round {
  id: string;
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}

export interface Match {
  id: string;
  tournamentId: string;
  round: string;
  home: Team;
  away: Team;
  homeResult: string;
  awayResult: string;
  matchDay: Date;
  endmatch: boolean;
  createdAt: Date;
}

export interface SeasonRepository extends Repository<Season, string> {}

export interface SeasonService extends Service<Season, string, SeasonFilter> {}

export const seasonModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  name: {
    type: "string",
  },
  status: {
    type: "string",
  },
  rounds: {
    type: "array",
  },

  stangdingsId: {
    type: "string",
  },
  tournamentId: {
    type: "string",
  },
  createdAt: { type: "datetime" },
};

export interface SeasonFilter extends Filter {
  id: string;
  name: string;
  status: string;
  rounds: Round[];
  standingsId: string;
  tournamentId: string;
  createdAt: Date;
}
