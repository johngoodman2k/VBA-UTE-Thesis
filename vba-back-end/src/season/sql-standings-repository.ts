import { param, Statement } from 'pg-extension';
import { buildToUpdate, DB, Repository } from 'query-core';
import { standingsModel } from '../standings/standings';
import { Standings, StandingsRepository } from './season';

export class SqlStandingsRepository extends Repository<Standings, string> implements StandingsRepository {
	constructor(db: DB) {
		super(db, 'standings', standingsModel);
	}
	getStandingsById(id: string): Promise<Standings[]> {
		return this.query<Standings>('select * from standings where id = $1', [id]);
	}
}
