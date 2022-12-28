import { Statement } from "pg-extension";
import { buildToUpdate, DB, Repository } from "query-core";
import { deleteFile } from "../../common/deleteFile";
import { Player, playerModel, PlayerRepository, Team } from "./player";
import { getPlayersByTeamId } from "./query";

export class SqlPlayerRepository
  extends Repository<Player, string>
  implements PlayerRepository
{
  constructor(db: DB) {
    super(db, "players", playerModel);

  }
  getPlayersByTeamId(teamId: string): Promise<Player[]> {
    return this.query<Player>("select * from players where teamid = $1", [
      teamId,
    ],this.map);
  }

  updatePlayer(id:string,player:Player):Promise<number>{
    const q = "UPDATE players SET firstName = $1, lastName = $2,dateOfBirth = $3, shirtNumber = $4,country = $5,weight = $6,height = $7,image = $8 WHERE id = $9"
    const params = [player.firstName, player.lastName, player.dateOfBirth, player.shirtNumber, player.country, player.weight, player.height, player.image,id]
    return this.exec(q,params).then(c=>c>0?1:0)
  }
  
  getAllPlayer():Promise<Player[]>{
    return this.query<Player>('SELECT firstname, lastname, dateofbirth, image, shirtnumber, height, weight, country, teams.teamlogo FROM players INNER JOIN teams  ON players.teamid  = teams.id ORDER BY players.createdat')
  }
  async delete(id: string, ctx?: any): Promise<number> {
    const player = await this.query<Player>("select * from players where id = $1", [id])
    if(!player || player.length ===0) return 0;
    const q1 = {
		  query: "delete from players where id = $1",
		  params: [id]
		}

    const stmt = [q1] as Statement[]

    const team = await this.query<Team>("select * from teams where id = $1",[player[0]["teamid"]])
		if(team && team.length !==0){
		  if(!team[0].players) team[0].players = [];
		  let players = []
		  for(const p of team[0].players){
			if(p.id !== id){
				players.push(p);
			}
		  }
		  if(players.length===0) players = null
		  const q2 = {
			  query: `UPDATE teams SET players=$2 WHERE $1 <@ ANY(players)`,
			  params: [{id: id}, players]
		  }
		  stmt.push(q2);
		}

    const exec = await this.execBatch(stmt)
    if(exec >0){
      if(player[0].image){
        await deleteFile(player[0].image)
      }
      return 1;
    }else{
      return 0;
    }
  }
}

// select * from players where teams @> $1`