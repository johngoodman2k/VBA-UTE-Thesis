import { Controller, handleError, Log } from "express-ext";
import { Request, Response } from "express";
import { Player, Team, TeamFilter, TeamService } from "./team";
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


}
