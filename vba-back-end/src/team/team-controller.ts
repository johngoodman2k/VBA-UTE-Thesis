import { Controller, handleError, Log } from "express-ext";
import { Request, Response } from "express";
import { Team, TeamFilter, TeamService } from "./team";
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

    const cardDefault = { red: "0", yellow: "0" };

    const newPlayers = player.map((_item) => ({
      ..._item,
      id: nanoid(),
      card: cardDefault,
      createdAt: new Date(Date.now()),
    }));
    console.log(newPlayers);

    const teams = await this.teamService.getTeamById(teamId);

    const newPlayers1 = [];
    if (teams[0].players === null) {
      newPlayers1.push(...newPlayers);
    } else {
      newPlayers1.push(...teams[0].players.concat(newPlayers));
      // console.log("OK!");
      // console.log(newPlayers1);
    }
    const result = this.teamService.updateTeam({
      players: newPlayers1,
      ...teams[0],
    });

    const newPlayers3 = newPlayers.map((_item) => ({
      ..._item,
      teams: [{ id: teamId }],
    }));

    // console.log(newPlayers);

    const result1 = this.teamService.addPlayer(newPlayers3);

    // if (!players) return res.status(400).json({ err: "Failed to get player" });

    // const team = await this.teamService.getTeamById(teamId);
    return res.status(200).json(result1);
  }
}
