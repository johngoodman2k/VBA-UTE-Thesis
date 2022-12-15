import { handleError } from 'express-ext';
import { matchModel } from 'match';
import { param } from 'pg-extension';
import { buildToInsertBatch, DB, Repository } from 'query-core';
import { standingsModel } from '../standings/standings';
import { teamModel } from '../team/team';
// import { getAllTeams } from "./query";
import { Standings, StandingsRepository, TeamRepository } from './tournament';

export class SqlStandingsRepository extends Repository<Standings, string> implements StandingsRepository {
	constructor(db: DB) {
		super(db, 'standings', standingsModel);
	}

	//
}
