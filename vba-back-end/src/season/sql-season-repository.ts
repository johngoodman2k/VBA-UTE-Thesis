import { count, param, Statement } from 'pg-extension';
import { buildToInsert, buildToUpdate, DB, Repository } from 'query-core';
import { Standings, standingsModel } from '../standings/standings';
import { teamModel } from '../team/team';
import { Season, seasonModel, SeasonRepository, Team } from './season';
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
	async createTeamAndAddTeamToSeason(team: Team, season: Season, standings: Standings): Promise<number> {
		const q1 = buildToInsert(team, 'teams', teamModel, this.param);
		const q2 = buildToUpdate(standings, 'standings', standingsModel, this.param);
		const q3 = buildToUpdate(season, 'seasons', seasonModel, this.param);

		const count = await this.execBatch([q1, q2, q3]);
		return (count > 0 ? 1 : 0);
	}
}
