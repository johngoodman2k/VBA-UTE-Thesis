import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { Match, MatchFilter, MatchService } from "./match";

export class MatchController extends Controller<Match, string, MatchFilter> {
  constructor(log: Log, protected matchService: MatchService) {
    super(log, matchService);
    this.getMatches = this.getMatches.bind(this);
  }
  getMatches(req: Request, res: Response) {
    const tournamentId = "";
    const round = "";
    this.matchService
      .getMatches(tournamentId, round)
      .then((matches) => {
        res.status(200).json(matches).end();
      })
      .catch((err) => handleError(err, res, this.log));
  }
}
