import { param, Statement } from 'pg-extension';
import { buildToInsert, DB, Repository } from 'query-core';
import { teamModel } from '../team/team';
import { seasonModel, TeamRepository, Team } from './season';

export class SqlTeamRepository extends Repository<Team, string> implements TeamRepository {
	constructor(db: DB) {
		super(db, 'teams', teamModel);
	}
}
