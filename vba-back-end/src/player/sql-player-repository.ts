import { buildToUpdate, DB, Repository } from "query-core";
import { Player, playerModel, PlayerRepository } from "./player";
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
    ]);
  }

  updatePlayer(id:string,player:Player):Promise<number>{
    const q = "UPDATE players SET firstName = $1, lastName = $2,dateOfBirth = $3, shirtNumber = $4,country = $5,weight = $6,height = $7,image = $8 WHERE id = $9"
    const params = [player.firstName, player.lastName, player.dateOfBirth, player.shirtNumber, player.country, player.weight, player.height, player.image,id]
    return this.exec(q,params).then(c=>c>0?1:0)
  }
  
  getAllPlayer():Promise<Player[]>{
    return this.query<Player>('SELECT firstname, lastname, dateofbirth, image, shirtnumber, height, weight, country, teams.teamlogo FROM players INNER JOIN teams  ON players.teamid  = teams.id ORDER BY players.createdat')
  }
}

// select * from players where teams @> $1`