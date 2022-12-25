import { playerModel } from "../player/player";
import { buildToInsert, buildToUpdate, DB, Repository } from "query-core";
import { getTeamById } from "./query";
import { Player, Season, Standings, Team, teamModel, TeamRepository } from "./team";
import { Statement } from "pg-extension";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository
{
  constructor(db: DB) {
    super(db, "teams", teamModel);
  }

  getTeamById(teamId: string): Promise<Team[]> {
    return this.query<Team>("select * from teams where id = $1", [teamId]);
  }

  getTeamsBySeasonId(seasonId: string):Promise<Team[]> {
    return this.query<Team>('select * from teams where seasonid = $1',[seasonId])
  }

  createPlayerAndAddPlayerToTeam(player: Player, team: Team): Promise<number>{
    const q1 = buildToInsert(player,"players",playerModel,this.param)
    const q2 = buildToUpdate(team,"teams",teamModel,this.param)
    return this.execBatch([q1,q2]).then(count => count >0 ? 1:0)
  }
  updateTeam( id:string,team:Team):Promise<number>{
    const q1 = buildToUpdate({...team,id},"teams",teamModel,this.param)
    return this.exec(q1.query,q1.params)
  }
  async delete(id: string, ctx?:any): Promise<number> {
    const team = await this.query<Team>("select * from teams where id = $1",[id])
    if(!team || team.length ===0) return 0;
    const q1 = {
      query: "delete from teams where id = $1",
      params: [id]
    }
    const q2 = {
      query: "delete from players where teamid = $1",
      params: [id]
    }
    const stmt = [q1,q2] as Statement[]
    const season = await this.query<Season>("select * from seasons where id = $1",[team[0]["seasonid"]])
    if(season && season.length !==0){
      if(!season[0].teams) season[0].teams = [];
      let teams = []
      for(const t of season[0].teams){
        if(t.id !== id){
          teams.push(t);
        }
      }
      if(teams.length===0) teams = null
      const q3 = {
        query: `UPDATE seasons SET teams=$2 WHERE $1 <@ ANY(teams)`,
        params: [{id: id}, teams]
      }
      stmt.push(q3);

      const standings = await this.query<Standings>("select * from standings where id = $1",[season[0].standingsid])
      if(standings && standings.length !==0){
        if(!standings[0].statistics) standings[0].statistics = [];
        let teams1 = []
        for(const t of standings[0].statistics){
          if(t.teamId !== id){
            teams1.push(t);
          }
        }
        if(teams1.length===0) teams1 = null
        const q4 = {
          query: `UPDATE standings SET statistics=$2 WHERE $1 <@ ANY(statistics)`,
          params: [{teamId: id}, teams1]
        }
        stmt.push(q4);
      }
    }
    return this.execBatch(stmt).then(c => c>0?1:0)
  }

}
