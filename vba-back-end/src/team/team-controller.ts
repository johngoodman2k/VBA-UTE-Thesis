import { Controller, handleError, Log } from "express-ext";
import { Request, Response } from "express";
import { Player, Team, TeamFilter, TeamService } from "./team";
import { getTeamById } from "./query";
import { nanoid } from "nanoid";

export class TeamController extends Controller<Team, string, TeamFilter> {
  constructor(log: Log, protected teamService: TeamService) {
    super(log, teamService);
    this.addPlayerToTeam = this.addPlayerToTeam.bind(this);
  }
  // getTeamByTournamentId(req: Request, res: Response) {
  //   const tournamentId = "";
  //   this.teamService
  //     .getTeamByTournamentId(tournamentId)
  //     .then((teams) => {
  //       return res.status(200).json(teams).end();
  //     })
  //     .catch((err) => handleError(err, res, this.log));
  // }

  async addPlayerToTeam(req: Request, res: Response) {
    const { teamId } = req.params;
    const player = req.body;
    // const players = await this.teamService.getPlayerById(playerId);
    if (Object.keys(player).length === 0) {
      return res.status(400).json({ err: "Player is empty" });
    }

    const newPlayers = player.map((_item: Player) => {
      _item.id = nanoid();
      _item.createdAt = new Date(Date.now());
      return _item;
    });

    const teams = await this.teamService.getTeamById(teamId);

    const newPlayers1: Player[] = [] as any;
    if (teams[0].players === null) {
      newPlayers1.push(...newPlayers);
    } else {
      newPlayers1.push(...teams[0].players.concat(newPlayers));
    }
    teams[0].players = newPlayers1;
    const result = this.teamService.updateTeam(teams[0]);

    delete teams[0].players;
    const newPlayers3 = newPlayers.map((_item: Player) => {
      _item.teams = teams[0];
      return _item;
    });

    console.log(newPlayers3);

    const result1 = this.teamService.addPlayer(newPlayers3);
    return res.status(200).json(result1);
  }
}
