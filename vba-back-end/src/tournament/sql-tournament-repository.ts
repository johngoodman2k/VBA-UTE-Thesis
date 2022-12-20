import { handleError } from 'express-ext';
import { matchModel } from '../match/match';
import { count,param } from 'pg-extension';
import { buildToInsert, buildToInsertBatch, buildToUpdate, DB, Repository, select } from 'query-core';
import { seasonModel } from '../season/season';
import { standingsModel } from '../standings/standings';
import { getTournamentById } from './query';
import { Match, Round, Season, Standings, Team, Tournament, tournamentModel, TournamentRepository } from './tournament';
import { roundModel } from '../round/round';

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
	createGenerate(matches: Match[],rounds:Round[],season:Season):Promise<number>{
		const q1 =  buildToInsertBatch<Match>(matches,"matches",matchModel,param);
		const q2 =  buildToInsertBatch<Round>(rounds,"rounds",roundModel,param);
		const q3 =  buildToUpdate<Season>(season,"seasons",seasonModel,this.param);

		return this.execBatch([q1,q2,q3]).then((count) => (count > 0 ?1:0))
	}
	getMergeTournamentById(tournamentId: string,seasonId:string):Promise<Tournament[]>{
		return this.query<Tournament>('select t.id, t.name, t.description, startdate, enddate, type, competitor, s.id as seasonid, s.name as seasonname, r.roundname, te.teamname, te.teamlogo, m.matchday, m.id as matchid, m.home as matchhome, m.away as matchaway, te.id as teamid, te.stadiumname, r.id as roundid, r.createdat as roundcreatedat FROM 	tournaments t INNER JOIN seasons s 	ON  s.tournamentid = t.id INNER JOIN rounds r 	ON  r.seasonid  = s.id   INNER JOIN matches m  	ON  m.round  = r.id 	 INNER JOIN teams te 	ON  te.id  = m.home or te.id  = m.away      where t.id = $1 and  s.id = $2 ORDER BY t.createdat',[tournamentId,seasonId])
	}
}
