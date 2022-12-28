import { nanoid } from "nanoid";
import { Attributes, Filter } from "onecore";
import { Match } from "../match/match";

export interface Round {
  id: string;
  roundname: string;
  seasonId: string;
  matches: Match[];
  playoff: boolean;
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
  seasonId: {
    type: "string",
    required: true,
  },
  matches: { type: "array" },
  playoff:{type: "boolean", default: false},
  createdAt: { type: "datetime" },
};

export interface RoundFilter extends Filter {
  id: string;
  roundname: string;
  seasonId: string;
  matches: Match[];
  createdAt: Date;
}
