import { count, param, Statement } from 'pg-extension';
import { buildToInsert, buildToUpdate, DB, Repository } from 'query-core';
import { deleteFile } from '../../common/deleteFile';
import { Standings, standingsModel } from '../standings/standings';
import { teamModel } from '../team/team';
import { Player, Season, seasonModel, SeasonRepository, Team, Tournament } from './season';
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

	async delete(id: string, ctx?: any): Promise<number> {
		const season = await this.query<Season>("select * from seasons where id = $1",[id])
		if(!season || season.length ===0) return 0;
		const q1 = {
		  query: "delete from seasons where id = $1",
		  params: [id]
		}
		const q2 = {
		  query: "delete from rounds where seasonid = $1",
		  params: [id]
		}
		const q3 = {
			query: "delete from matches where seasonid = $1",
			params: [id]
		}
		const q4 = {
			query: "delete from standings where seasonid = $1",
			params: [id]
		}
		const q5 = {
			query: "delete from teams where seasonid = $1",
			params: [id]
		}
		const stmt = [q1,q2,q3,q4,q5] as Statement[]
		const teams = await this.query<Team>("select * from teams where seasonid = $1",[season[0].id])
		
		let saveUrlTeam = []
		let saveUrlPlayer = []
		if(teams && teams.length !==0){
			for(const t of teams){
				const q = {
					query: "delete from players where teamid = $1",
					params: [t.id]
				}
				saveUrlTeam.push(t.stadiumpic,t["teamlogo"])
				stmt.push(q)
			}
			const playerOnTeams = await Promise.all(teams.map((t)=> this.query<Player>("select * from players where teamid = $1",[t.id])))
			for(const p of playerOnTeams){
				if(p && p.length !==0){
					for(const pl of p){
						saveUrlPlayer.push(pl.image)
					}
				}
			}
		}
		

		
		const tournament = await this.query<Tournament>("select * from tournaments where id = $1",[season[0]["tournamentid"]])
		if(tournament && tournament.length !==0){
		  if(!tournament[0].seasons) tournament[0].seasons = [];
		  let seasons = []
		  for(const s of tournament[0].seasons){
			if(s.id !== id){
				seasons.push(s);
			}
		  }
		  if(seasons.length===0) seasons = null
		  const q5 = {
			query: `UPDATE tournaments SET seasons=$2 WHERE $1 <@ ANY(seasons)`,
			params: [{id: id}, seasons]
		  }
		  stmt.push(q5);
	
		  
		}

		const exec = await this.execBatch(stmt)

		if(exec >0){
			if(saveUrlTeam.length !==0){
				await Promise.all(saveUrlTeam.map(r => deleteFile(r)))
			}

			if(saveUrlPlayer.length !==0){
				await Promise.all(saveUrlPlayer.map(r => deleteFile(r)))
			}

			return 1;
		}else{
			return 0;
		} 
	}
}
