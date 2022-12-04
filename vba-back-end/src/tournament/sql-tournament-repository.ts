import { handleError } from "express-ext";
import { DB, Repository, select } from "query-core";
import { getTournamentById } from "./query";
import {
    Match,
    Round,
    Season,
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

    updateTournament(tournament: Tournament, ctx?: any): Promise<number> {
        return this.update(tournament, ctx);
    }

    updateSeasonTournament(
        tournament: Tournament,
        newSeason: Season[],
        ctx?: any
    ): Promise<number> {
        const result = this.update({ ...tournament, seasons: newSeason }, ctx);

        return result;
    }

    getAllTournament(): Promise<Tournament[]> {
        return this.all();
    }

    createTournament(tournament: Tournament, ctx?: any): Promise<number> {
        return this.insert(tournament, ctx);
    }
}
