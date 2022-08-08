import { Controller, handleError, Log } from "express-ext";
import { Request, Response } from "express";
import { Team, TeamFilter, TeamService } from "./team";

export class TeamController extends Controller<Team, string, TeamFilter> {
  constructor(log: Log, protected teamService: TeamService) {
    super(log, teamService);
  }
  getTeamByTournamentId(req: Request, res: Response) {
    const tournamentId = "";
    this.teamService
      .getTeamByTournamentId(tournamentId)
      .then((teams) => {
        return res.status(200).json(teams).end();
      })
      .catch((err) => handleError(err, res, this.log));
  }
}
