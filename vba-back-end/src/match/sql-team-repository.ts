import { DB, Repository } from "query-core";
import { Team, teamModel } from "../team/team";
import { Match, matchModel, TeamRepository, Process } from "./match";

export class SqlTeamRepository
  extends Repository<Team, string>
  implements TeamRepository
{
  constructor(db: DB) {
    super(db, "teams", teamModel);
  }

  getTeamByMatchId(matchId: string): Promise<Team[]>{
    // return this.query<Team>("SELECT  m.id,  m.home,  m.away,  m.homeresult,  m.awayresult,  m.createdat,  m.matchday,  m.endmatch,  m.referee,  m.assistance, m.spectators ,t.id as teamid,  t.teamname,  t.teamlogo,  t.stadiumname,  t.stadiumpic,  t.description,  t.status,  t.color,  t.eliminated,  t.shortname,  t.createdat as teamcreatedat FROM  matches m INNER JOIN teams t    ON m.home  = t.id or m.away =t.id where m.id = $1 ORDER BY m.createdat",[matchId])
    return this.query<Team>("select t.id, teamname, teamlogo, stadiumname, stadiumpic, description, status, color, seasonid, eliminated, shortname, t.createdat, p.id as playerid, p.firstname, p.lastname, p.dateofbirth, p.image, p.shirtnumber, p.height, p.weight, p.teamid, p.country from teams t inner join players p  on t.id = p.teamid where t.id = $1",[matchId])
  }

  getTeamById(teamId: string): Promise<Team[]>{
    // return this.query<Team>("SELECT  m.id,  m.home,  m.away,  m.homeresult,  m.awayresult,  m.createdat,  m.matchday,  m.endmatch,  m.referee,  m.assistance, m.spectators ,t.id as teamid,  t.teamname,  t.teamlogo,  t.stadiumname,  t.stadiumpic,  t.description,  t.status,  t.color,  t.eliminated,  t.shortname,  t.createdat as teamcreatedat FROM  matches m INNER JOIN teams t    ON m.home  = t.id or m.away =t.id where m.id = $1 ORDER BY m.createdat",[matchId])
    return this.query<Team>("select * from teams where id = $1",[teamId])
  }
}
