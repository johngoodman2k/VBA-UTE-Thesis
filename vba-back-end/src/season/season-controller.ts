import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { Season, SeasonFilter, SeasonService } from "./season";

export class SeasonController extends Controller<Season, string, SeasonFilter> {
  constructor(log: Log, protected seasonService: SeasonService) {
    super(log, seasonService);
  }
}
