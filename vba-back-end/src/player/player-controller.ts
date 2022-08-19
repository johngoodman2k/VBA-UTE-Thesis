import { Controller, Log } from "express-ext";
import { Player, PlayerFilter, PlayerService } from "./player";
import { Request, Response } from "express";

export class PlayerController extends Controller<Player, string, PlayerFilter> {
  constructor(log: Log, protected playerService: PlayerService) {
    super(log, playerService);
    this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
  }

  async getPlayersByTeamId(req: Request, res: Response) {
    const { teamId } = req.params;
    console.log(teamId);
    const players = await this.playerService.getPlayersByTeamId({ id: teamId });

    if (!players) return res.status(400).json({ err: "Failed to get players" });

    return res.status(200).json(players);
  }
}
