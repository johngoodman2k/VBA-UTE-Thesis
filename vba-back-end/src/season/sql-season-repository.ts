import { count, param, Statement } from 'pg-extension';
import { Team } from 'player';
import { buildToInsert, buildToUpdate, DB, Repository } from 'query-core';
import { Standings, standingsModel } from '../standings/standings';
import { teamModel } from '../team/team';
import { Season, seasonModel, SeasonRepository } from './season';
export class SqlSeasonRepository extends Repository<Season, string> implements SeasonRepository {
	constructor(db: DB) {
		super(db, 'seasons', seasonModel);
	}
	getSeasonById(seasonId: string): Promise<Season[]> {
		return this.query<Season>('Select * from seasons where id = $1', [seasonId]);
	}

	getSeasonByTournamentId(tournamentId: string): Promise<Season[]> {
		return this.query<Season>('Select * from seasons where tournamentid = $1', [tournamentId]);
	}
	createTeamAndAddTeamToSeason(team: Team, season: Season, standings: Standings): Promise<number> {
		const q1 = buildToInsert(team, 'teams', teamModel, this.param);
		const q2 = buildToUpdate(standings, 'standings', standingsModel, this.param);
		const q3 = buildToUpdate(season, 'seasons', seasonModel, this.param);

		return this.execBatch([q1, q2, q3]).then((count) => (count > 0 ? 1 : 0));
	}
}
