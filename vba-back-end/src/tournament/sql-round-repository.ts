import { handleError } from "express-ext";
import { matchModel } from "match";
import { param } from "pg-extension";
import { buildToInsertBatch, DB, Repository } from "query-core";
import { roundModel } from "../round/round";
import { getRoundByTournamentId } from "./query";
// import { RoundRepository } from "./tournament";
import { Match, Round, RoundRepository } from "./tournament";

export class SqlRoundRepository
  extends Repository<Round, string>
  implements RoundRepository
{
  constructor(db: DB) {
    super(db, "rounds", roundModel);
  }

  getRoundByTournament(tournament: string): Promise<Round[]> {
    return this.query<Round>(getRoundByTournamentId, [tournament]);
  }

  saveRound(round: Round): Promise<number> {
    return this.insert(round);
  }

  buildToInsertRound(rounds: Round[], ctx?: any): Promise<number> {
    const stmt = buildToInsertBatch<Round>(rounds, "rounds", roundModel, param);
    if (!stmt) {
      return Promise.resolve(0);
    } else {
      return this.exec(stmt.query, stmt.params, ctx);
    }
  }
}
