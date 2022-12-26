import { Controller, handleError, Log } from "express-ext";
import { Request, Response } from "express";
import { Match, Player, Team, TeamFilter, TeamService } from "./team";
import { getTeamById } from "./query";
import { nanoid } from "nanoid";
import { deleteFile } from "../../common/deleteFile";

export class TeamController extends Controller<Team, string, TeamFilter> {
  constructor(log: Log, protected teamService: TeamService) {
    super(log, teamService);
    this.addPlayerToTeam = this.addPlayerToTeam.bind(this);
    this.getTeamsBySeasonId = this.getTeamsBySeasonId.bind(this);

  }

  async addPlayerToTeam(req: Request, res: Response) {
    const player = req.body as Player;

    console.log(19,player)
    // const players = await this.teamService.getPlayerById(playerId);
    // console.log("18",player)
    // if (Object.keys(player).length === 0) {
    //   return res.status(400).json({ err: "Player is empty" });
    // }

    const teams = await this.teamService.getTeamById(player.teamId);

    if(!teams || teams.length ===0) {
      if(req.file && req.file["firebaseUrl"]) deleteFile(req.file["firebaseUrl"])
      return res.status(400).json({message: 'Team is not exist'})

    }

    

    if (!teams[0].players) {
			teams[0].players = [];
		}
    player.id = nanoid()
    teams[0].players.push({id: player.id})

    if(req.file){
      player.image = req.file["firebaseUrl"]
    }

    const rs = await this.teamService.createPlayerAndAddPlayerToTeam(player, teams[0]);
		if (rs === 0) return res.status(400).json({ message: 'player create or add to team failed' });

    return res.status(200).json({message: 'create player successfully'});
  }

  async getTeamsBySeasonId(req: Request, res: Response) {
		const { seasonId } = req.params;
    console.log("40",seasonId)
		const teams = await this.teamService.getTeamsBySeasonId(seasonId);
    console.log("42",teams)
		if (!teams) return res.status(400).json({ message: "can't get teams in this season" });

		 return res.status(200).json(teams);
	}

  async update(req, res) {
    const team = req.body as Team;
    const {id} = req.params;

    const saveUrlTeamLogo = team.teamLogo
    const saveUrlStadium = team.stadiumpic

    if (req.files) {
      team.teamLogo= req.files["teamLogo"][0].firebaseUrl
      team.stadiumpic=req.files["stadiumpic"][0].firebaseUrl
      }

    const updateTeam = await  this.teamService.updateTeam(id,team)
    if(updateTeam === 0) {
      if(req.files){
				if(req.files["teamLogo"][0].firebaseUrl && req.files["teamLogo"][0].firebaseUrl !== "") deleteFile(req.files["teamLogo"][0].firebaseUrl)
				if(req.files["stadiumpic"][0].firebaseUrl && req.files["stadiumpic"][0].firebaseUrl !== "") deleteFile(req.files["stadiumpic"][0].firebaseUrl)
			}      
      return res.status(400).json(updateTeam)
    };
    if(saveUrlTeamLogo) deleteFile(saveUrlTeamLogo)
    if(saveUrlStadium) deleteFile(saveUrlStadium)

    return res.status(200).json(updateTeam)
  }
  async load(req: Request, res: Response){
    const {id} = req.params
    const teams = await this.teamService.getTeamById(id)
    
    if(!teams) return res.status(404).json({err: 'Teams not found'}) 
    if( teams.length ===0) return res.status(200).json(teams)

    const players = await this.teamService.getPlayerByTeamId(teams[0].id)
    if(!players) return res.status(404).json({err: 'Players not found'})

    teams[0].players = players

    const m1 = await this.teamService.getMatchByIdTeamId(teams[0].id,"home")
    const m2 = await this.teamService.getMatchByIdTeamId(teams[0].id,"away")
    if(!m1 || !m2) return res.status(404).json({err: 'Matches not found'})

    const m = m1.concat(m2)
    teams[0].matches = m;
    const allTeam = await this.teamService.all()
    for(const m of teams[0].matches){
      m.home = allTeam.find(t => t.id === m.home)
      m.away = allTeam.find(t => t.id === m.away)
    }
    
    return res.status(200).json(teams[0])
  }

  async delete(req: Request, res: Response) {
    const {id} = req.params
    const isDelete = await this.teamService.delete(id)
    if(isDelete ===0) return res.status(400).json({err:"Delete failed"})

    return res.status(200).json({message: "Delete successfully"})
  }

}
