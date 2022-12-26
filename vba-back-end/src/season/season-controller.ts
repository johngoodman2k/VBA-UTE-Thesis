import { Request, Response } from 'express';
import { Controller, handleError, Log } from 'express-ext';
import { ParamsDictionary } from 'express-serve-static-core';
import { nanoid } from 'nanoid';
import { ParsedQs } from 'qs';
import {deleteFile} from "../../common/deleteFile"
import { Season, SeasonFilter, SeasonService, Team } from './season';

export class SeasonController extends Controller<Season, string, SeasonFilter> {
	constructor(log: Log, protected seasonService: SeasonService) {
		super(log, seasonService);
		this.createTeamAndAddTeamToSeason = this.createTeamAndAddTeamToSeason.bind(this);
		this.getSeasonByTournamentId = this.getSeasonByTournamentId.bind(this);
	}
	async createTeamAndAddTeamToSeason(req: Request, res: Response) {
		const team = req.body as Team;
		console.log("15",req)
		//get season by Id
		try {

		const season = await this.seasonService.getSeasonById(team.seasonId);
		if (!season || season.length === 0) {
			if(req.files){
				if(req.files["teamLogo"][0].firebaseUrl && req.files["teamLogo"][0].firebaseUrl !== "") deleteFile(req.files["teamLogo"][0].firebaseUrl)
				if(req.files["stadiumpic"][0].firebaseUrl && req.files["stadiumpic"][0].firebaseUrl !== "") deleteFile(req.files["stadiumpic"][0].firebaseUrl)
			}
			
			return res.status(400).json({ err: 'Failed to get season' });
		}

		//create team
		const teamId = nanoid();
		team.id = teamId;

		//add team to season
		if (!season[0].teams) {
			season[0].teams = [];
		}
		season[0].teams.push({ id: team.id });

		//add team to stangdings
			const standings = await this.seasonService.getStandingsById(season[0]['standingsid']);
			if (!standings || standings.length === 0) {
				return res.status(400).json({ err: 'Failed to get stangdings' });
			}
	
			if (!standings[0].statistics) {
				standings[0].statistics = [];
			}
			standings[0].statistics.push({ teamId: team.id });
			if (req.files) {
				team.teamLogo= req.files["teamLogo"][0].firebaseUrl
				team.stadiumpic=req.files["stadiumpic"][0].firebaseUrl
	
			  }
			  
	
			const rs = await this.seasonService.createTeamAndAddTeamToSeason(team, season[0], standings[0]);
			if (rs === 0){ return res.status(400).json({ message: 'team create failed' });}
		
				return res.status(201).json({ message: 'create team successfully' });
		}catch(e){
			return res.status(500).json({ message: "Invalid server" });

		}
		

	}
	async getSeasonByTournamentId(req: Request, res: Response) {
		const { tournamentId } = req.params;
		const seasons = await this.seasonService.getSeasonByTournamentId(tournamentId);
		if (!seasons) return res.status(400).json({ message: "can't get seasons in this tournament" });

		 return res.status(200).json(seasons);
	}
	async delete(req: Request, res: Response) {
		const {id} = req.params;
		const isDelete = await this.seasonService.delete(id)

		if(isDelete === 0) return res.status(400).json({err: "Delete failed"})
		return res.status(200).json({message: "Delete successfully"})
	}
}
