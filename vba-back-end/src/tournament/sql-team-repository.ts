import { handleError } from "express-ext";
import { matchModel } from "match";
import { param } from "pg-extension";
import { buildToInsertBatch, DB, Repository } from "query-core";
import { teamModel } from "../team/team";
import { getAllTeams } from "./query";
import { TeamRepository } from "./tournament";
import {
  Match,
  Round,
  Team,
  Tournament,
  tournamentModel,
  TournamentRepository,
} from "./tournament";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository
{
  constructor(db: DB) {
    super(db, "teams", teamModel);
  }

  getTeamByTournament(tournament: string): Promise<Team[]> {
    return this.query<Team>(getAllTeams, [tournament]);
  }
}
