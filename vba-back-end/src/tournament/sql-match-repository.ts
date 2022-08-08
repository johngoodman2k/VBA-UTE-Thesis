import { handleError } from "express-ext";
import { matchModel } from "../match/match";
import { param } from "pg-extension";
import { buildToInsertBatch, DB, Repository } from "query-core";
import { MatchRepository, Match } from "./tournament";
// import { Match } from "../match/match";

export class SqlMatchRepository
  extends Repository<Match, string>
  implements MatchRepository
{
  constructor(db: DB) {
    super(db, "matches", matchModel);
  }

  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number> {
    const stmt = buildToInsertBatch<Match>(
      matches,
      "matches",
      matchModel,
      param
    );
    if (!stmt) {
      return Promise.resolve(0);
    } else {
      return this.exec(stmt.query, stmt.params, ctx);
    }
  }
}
