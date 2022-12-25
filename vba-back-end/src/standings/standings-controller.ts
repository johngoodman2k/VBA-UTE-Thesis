import { Request, Response } from "express";
import { Controller, Log } from "express-ext";
import { Standings, StandingsFilter, StandingsService, Statistics } from "./standings";

export class StandingsController extends Controller<
  Standings,
  string,
  StandingsFilter
> {
  constructor(log: Log, protected standingsService: StandingsService) {
    super(log, standingsService);
    this.getStandingsBySeasonId = this.getStandingsBySeasonId.bind(this);
  }
  async getStandingsBySeasonId(req: Request, res: Response) {
    const { seasonId } = req.params

    const standings = await this.standingsService.getStangdingsBySeasonId(seasonId)
    if (!standings) res.status(400).json({ err: "Failed to get standings" })
    const teams = await this.standingsService.getTeamsBySeasonId(seasonId)
    if (!teams || teams.length === 0) res.status(200).json(standings)

    const newStandings = standings[0].statistics.map((item,i) => {return {...item,teams: teams[i]}})
    standings[0].statistics =  newStandings as any
    return res.status(200).json(standings)
  }

}
