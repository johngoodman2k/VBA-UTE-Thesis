import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { nanoid } from "nanoid";
import { Team } from "../team/team";
import { findAncestor } from "typescript";
import { Match, MatchFilter, MatchService, Process } from "./match";

export class MatchController extends Controller<Match, string, MatchFilter> {
    constructor(log: Log, protected matchService: MatchService) {
        super(log, matchService);
        this.addProcessToMatch = this.addProcessToMatch.bind(this);
        this.updateProcess = this.updateProcess.bind(this);
        this.getMatchDetails = this.getMatchDetails.bind(this);    
    }

    async addProcessToMatch(req: Request, res: Response) {
        // const { matchId } = req.params;
        const process = req.body as Process

        try {

            const match = await this.matchService.getMatchById(process.match);
            if (!match || match.length === 0) {
                return res.status(400).json({ err: 'Failed to get match' });
            }
    
            //create process

            process.id = nanoid();
    
            //add process to match
            if (!match[0].process) {
                match[0].process = [];
            }
            match[0].process.push({ id: process.id });
    
            const rs = await this.matchService.createProcessAndAddProcessToMatch(process,match[0]);
            if (rs === 0){ return res.status(400).json({ message: 'process create failed' });}
            
             return res.status(201).json({ message: 'create process successfully' });
        }catch(e){
            return res.status(500).json({ message: "Invalid server" });

        }
            
    }

    async updateProcess(req: Request, res: Response) {
        const { matchId } = req.params;
        const process = req.body;

        const matches = await this.matchService.getMatchById(matchId);

        if (matches[0].process === null) {
            return res.status(400).json({ error: "process is emptied" });
        } else {
            if (!process) {
                return res.status(400).json({ error: "Invalid process" });
            }
            const indexProcessNeedUpdate = matches[0].process.findIndex(
                (item: Process) => item.id === process.id
            );
            if (indexProcessNeedUpdate === -1) {
                return res.status(400).json({ error: "process not found" });
            }
            matches[0].process[indexProcessNeedUpdate] = process;
            await this.matchService.updateMatch(
                matches[0].id,
                matches[0].process
            );
            await this.matchService.updateProcess(process);
            return res.status(200).json(process);
        }
    }

    async getMatchDetails(req:Request,res:Response){
        const {id} = req.params
        const matches = await this.matchService.getMatchById(id);
        if(!matches) return res.status(404).json({ err: "Match not found" });
        if(matches.length ===0) return res.status(200).json(matches);

        const teamsInSeason = await this.matchService.getTeamBySeasonId(matches[0].seasonId);
		if(!teamsInSeason){
			return res.status(404).json({err: "Teams doest not exist"})
		}
		if(teamsInSeason.length ===0){
			return res.status(200).json(matches[0])
		}

        const  playerOnTeams = await Promise.all(teamsInSeason.map(async team => await this.matchService.getPlayerByTeamId(team.id)))

        for(let i = 0; i < teamsInSeason.length; i++){
            teamsInSeason[i].players = playerOnTeams[i]
        }
        // const player= await this.matchService.getPlayerByTeamId(te)

        for(const m of matches){
			m.home = teamsInSeason.find((t: Team) => t.id === m.home)
			m.away = teamsInSeason.find((t: Team) => t.id === m.away)
		}
        const processes = await this.matchService.getProcessByMatchId(matches[0].id);
        if(processes.length === 0){
            return res.status(200).json(matches[0])
        }
        matches[0].process = processes
    
        
        return res.status(200).json(matches[0])
    }
}
