import { Controller, Log } from "express-ext";
import { Standings, StandingsFilter, StandingsService } from "./standings";

export class StandingsController extends Controller<
  Standings,
  string,
  StandingsFilter
> {
  constructor(log: Log, StandingsService: StandingsService) {
    super(log, StandingsService);
  }
}
