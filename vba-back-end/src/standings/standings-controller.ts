import { Request, Response } from "express";
import { Controller, Log } from "express-ext";
import { Standings, StandingsFilter, StandingsService } from "./standings";

export class StandingsController extends Controller<
  Standings,
  string,
  StandingsFilter
> {
  constructor(log: Log, protected standingsService: StandingsService) {
    super(log, standingsService);
  }
  getStangdingsBySeasonId(req:Request,res:Response){
    const {seasonId} = req.params

    const standings = this.standingsService.getStangdingsBySeasonId(seasonId)
  }

}
