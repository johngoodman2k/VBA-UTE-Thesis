import { buildToUpdate, DB, Repository } from "query-core";
import { teamModel } from "../team/team";
import { Player, playerModel, PlayerRepository, Team, TeamRepository } from "./player";
import { getPlayersByTeamId } from "./query";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository
{
  constructor(db: DB) {
    super(db, "teams", teamModel);

  }
  async deletePlayerOnTeam(teamId:string,playerId:string):Promise<number>{
    const team = await this.load(teamId);
    if(!team || !team.players || team.players.length ===0) return 0
    let players = [] as {id:string}[] |null
    for(const p of team.players){
        if(p.id !== playerId){
            players.push(p);
        }
    }
    if(players.length ===0) players = null
    team.players = players
    return this.update(team)
  }

}

// select * from players where teams @> $1`