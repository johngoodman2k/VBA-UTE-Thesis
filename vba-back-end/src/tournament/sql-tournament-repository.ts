import { handleError } from "express-ext";
import { DB, Repository, select } from "query-core";
import { getTournamentById } from "./query";
import {
  Match,
  Round,
  Team,
  Tournament,
  tournamentModel,
  TournamentRepository,
} from "./tournament";

export class SqlTournamentRepository
  extends Repository<Tournament, string>
  implements TournamentRepository
{
  constructor(db: DB) {
    super(db, "tournaments", tournamentModel);
  }
  getTournamentById(id: string): Promise<Tournament[]> {
    return this.query<Tournament>(getTournamentById, [id]);
  }

  updateRoundTournament(
    tournament: Tournament,
    newRound: Round[],
    ctx?: any
  ): Promise<number> {
    const result = this.update({ ...tournament, rounds: newRound }, ctx);

    return result;
  }

  getAllTournament(): Promise<Tournament[]> {
    return this.all();
  }

  createTournament(tournament: Tournament, ctx?: any): Promise<number> {
    return this.insert(tournament, ctx);
  }
}
