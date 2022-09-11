import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { Process, ProcessFilter, ProcessService } from "./process";

export class ProcessController extends Controller<Process, string, ProcessFilter> {
  constructor(log: Log, protected processService: ProcessService) {
    super(log, processService);
    this.getMatches = this.getMatches.bind(this);
  }
  getMatches(req: Request, res: Response) {
    const tournamentId = "";
    const round = "";
    this.processService
      .getMatches(tournamentId, round)
      .then((matches) => {
        res.status(200).json(matches).end();
      })
      .catch((err) => handleError(err, res, this.log));
  }
}
