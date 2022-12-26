import { Controller, Log } from "express-ext";
import { Player, PlayerFilter, PlayerService } from "./player";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { deleteFile } from "../../common/deleteFile";

export class PlayerController extends Controller<Player, string, PlayerFilter> {
  constructor(log: Log, protected playerService: PlayerService) {
    super(log, playerService);
    this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
    this.update = this.update.bind(this);
    this.getAllPlayer = this.getAllPlayer.bind(this);

    
  }

  async getPlayersByTeamId(req: Request, res: Response) {
    const { teamId } = req.params;
    console.log(teamId);
    const players = await this.playerService.getPlayersByTeamId(teamId);

    if (!players) return res.status(400).json({ err: "Failed to get players" });

    return res.status(200).json(players);
  }
  async update(req, res) {
    const player = req.body as Player;
    const {id} = req.params;

    const saveUrl = player.image
    if(req.file){
      player.image = req.file["firebaseUrl"]
    }

    const updatePlayer = await  this.playerService.updatePlayer(id,player)
    if(updatePlayer === 0) {
      if(req.file && req.file["firebaseUrl"]) deleteFile(req.file["firebaseUrl"])
      return res.status(400).json(updatePlayer)
    };
    if(saveUrl) deleteFile(saveUrl)
    return res.status(200).json(updatePlayer)
    
  }

  async getAllPlayer(req:Request,res:Response){
    const players = await this.playerService.getAllPlayer()
    if(!players) return res.status(404).json({message: "No players found"})
    return res.status(200).json(players)
  }

  async delete(req: Request, res: Response) {
    const {id} = req.params

    const isDelete = await this.playerService.delete(id)
    if(isDelete ===0) return res.status(400).json({err: "Delete player failed"})
  
    return res.status(200).json({message: "Delete successfully"})
  }
}
