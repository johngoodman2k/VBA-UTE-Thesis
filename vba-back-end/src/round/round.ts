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

export const roundModel: Attributes = {
  id: {
    key: true,
    match: "equal",
    // default: nanoid()
    type: "string",
  },
  roundname: { type: "string" },
  tournamentId: {
    type: "string",
    required: true,
  },
  matches: { type: "array" },
  createdAt: { type: "datetime" },
};

export interface RoundFilter extends Filter {
  id: string;
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}
