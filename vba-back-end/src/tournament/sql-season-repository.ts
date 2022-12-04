import { handleError } from "express-ext";
import { matchModel } from "match";
import { param } from "pg-extension";
import { buildToInsertBatch, DB, Repository } from "query-core";
import { seasonModel } from "../season/season";
import { teamModel } from "../team/team";
// import { getAllTeams } from "./query";
import { Season, SeasonRepository } from "./tournament";

export class SqlSeasonRepository
    extends Repository<Season, string>
    implements SeasonRepository
{
    constructor(db: DB) {
        super(db, "seasons", seasonModel);
    }

    createSeason(season: Season, ctx?: any): Promise<number> {
        return this.insert(season, ctx);
    }
    getSeasonById(id: string): Promise<Season[]> {
        return this.query("select * from seasons where id = $1", [id]);
    }

    //
}
