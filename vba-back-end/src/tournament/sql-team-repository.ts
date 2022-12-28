import { handleError } from "express-ext";
import { matchModel } from "match";
import { param } from "pg-extension";
import { buildToInsertBatch, DB, Repository } from "query-core";
import { teamModel } from "../team/team";
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
        return this.query<Team>(
            `select * from teams where $1 = ANY(tournaments)`,
            [tournament]
        );
    }
    getTeamBySeasonId(seasonId: string):Promise<Team[]>{
        return this.query<Team>(
            `select * from teams where seasonid = $1`,
            [seasonId]
        );
    }
    getTeamAndSortWon(seasonId: string):Promise<Team[]>{
        return this.query<Team>(
            `select * from teams where seasonid = $1 order by won desc`,
            [seasonId]
        );
    }
}
