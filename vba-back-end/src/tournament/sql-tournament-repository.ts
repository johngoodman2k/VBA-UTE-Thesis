import { handleError } from 'express-ext';
import { count } from 'pg-extension';
import { buildToInsert, buildToUpdate, DB, Repository, select } from 'query-core';
import { seasonModel } from '../season/season';
import { standingsModel } from '../standings/standings';
import { getTournamentById } from './query';
import { Match, Round, Season, Standings, Team, Tournament, tournamentModel, TournamentRepository } from './tournament';

export class SqlTournamentRepository extends Repository<Tournament, string> implements TournamentRepository {
	constructor(db: DB) {
		super(db, 'tournaments', tournamentModel);
	}
	getTournamentById(id: string): Promise<Tournament[]> {
		return this.query<Tournament>(getTournamentById, [id]);
	}

	updateSeasonTournament(tournament: Tournament, newSeason: Season[], ctx?: any): Promise<number> {
		const result = this.update({ ...tournament, seasons: newSeason }, ctx);

		return result;
	}

	getAllTournament(): Promise<Tournament[]> {
		return this.all();
	}

	createTournament(tournament: Tournament, ctx?: any): Promise<number> {
		return this.insert(tournament, ctx);
	}
	createSeasonAndAddToTournament(season: Season, tournament: Tournament, standings: Standings): Promise<number> {
		const q1 = buildToInsert(season, 'seasons', seasonModel, this.param);
		const q2 = buildToUpdate(tournament, 'tournaments', tournamentModel, this.param);
		const q3 = buildToInsert(standings, 'standings', standingsModel, this.param);
		return this.execBatch([q1, q2, q3]).then((count) => (count > 0 ? 1 : 0));
	}
}
