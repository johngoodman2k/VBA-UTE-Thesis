import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { nanoid } from "nanoid";
import { Season, SeasonFilter, SeasonService, Team } from "./season";

export class SeasonController extends Controller<Season, string, SeasonFilter> {
    constructor(log: Log, protected seasonService: SeasonService) {
        super(log, seasonService);
        this.createTeamAndAddTeamToSeason = this.createTeamAndAddTeamToSeason.bind(this);
    }
    async createTeamAndAddTeamToSeason(req: Request, res: Response) {
        const team = req.body as Team;
        //get season by Id
        const season = await this.seasonService.getSeasonById(team.seasonId);
        console.log(season);
        if (!season || season.length === 0) {
            return res.status(400).json({ err: "Failed to get season" });
        }

        //create team
        const teamId = nanoid();
        team.id = teamId;
        await this.seasonService.createTeam(team);

        //add team to season
        if (!season[0].teams) {
            season[0].teams = [];
        }
        season[0].teams.push(team);

        await this.seasonService.updateSeason(season[0]);

        //add team to stangdings
        const standings = await this.seasonService.getStandingsById(season[0]["standingsid"]);
        if (!standings || standings.length === 0) {
            return res.status(400).json({ err: "Failed to get stangdings" });
        }

        if (!standings[0].statistics) {
            standings[0].statistics = [];
        }
        standings[0].statistics.push({ team: team });

        // update stangdings
        await this.seasonService.createTeam(team);
        await this.seasonService.updateSeason(season[0]);
        await this.seasonService.updateStandings(standings[0]);

        res.status(201).json({ message: "create team successfully" });
    }
}
