import { nanoid } from "nanoid";
import { Attributes, Filter } from "onecore";
import { Match } from "../match/match";

export interface Round {
  id: string;
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}

export interface Round {
  id: string;
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}
export const roundModel: Attributes = {
  id: {
    key: true,
    match: "equal",
    // default: nanoid()
  },
  roundname: {},
  tournamentId: {
    required: true,
  },
  matches: {},
  createdAt: {},
};

export interface RoundFilter extends Filter {
  id: string;
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}
