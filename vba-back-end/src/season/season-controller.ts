import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { nanoid } from "nanoid";
import { Season, SeasonFilter, SeasonService, Team } from "./season";

export class SeasonController extends Controller<Season, string, SeasonFilter> {
    constructor(log: Log, protected seasonService: SeasonService) {
        super(log, seasonService);
    }
    async createTeamAndAddTeamToSeason(req: Request, res: Response) {
        const team = req.body as Team;
        //get season by Id
        const season = await this.seasonService.getSeasonById(team.seasonId);

        //create team
        const teamId = nanoid();
        team.id = teamId;
        await this.seasonService.createTeam(team);

        //add team to season
        season[0].teams.push(team);
        await this.seasonService.updateSeason(season[0]);

        res.status(201).json({ message: "create team successfully" });
    }
}
