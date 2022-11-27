import { DB, Repository } from "query-core";
import { Season, seasonModel, SeasonRepository } from "./season";

export class SqlSeasonRepository
    extends Repository<Season, string>
    implements SeasonRepository
{
    constructor(db: DB) {
        super(db, "seasons", seasonModel);
    }
    getSeasonById(seasonId: string): Promise<Season[]> {
        return this.query<Season>("Select * from season where seasonId = $1", [
            seasonId,
        ]);
    }
    updateSeason(season: Season, ctx?: any): Promise<number> {
        return this.update(season, ctx);
    }
}
