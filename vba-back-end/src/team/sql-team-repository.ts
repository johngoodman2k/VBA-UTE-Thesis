import { playerModel } from "../player/player";
import { buildToInsert, buildToUpdate, DB, Repository } from "query-core";
import { getTeamById } from "./query";
import { Player, Team, teamModel, TeamRepository } from "./team";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository
{
  constructor(db: DB) {
    super(db, "teams", teamModel);
  }

  getTeamById(teamId: string): Promise<Team[]> {
    return this.query<Team>(getTeamById, [teamId]);
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


}
