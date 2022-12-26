import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { nanoid } from "nanoid";
import { Team } from "../team/team";
import { findAncestor } from "typescript";
import { Match, MatchFilter, MatchService, Player, Process } from "./match";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class MatchController extends Controller<Match, string, MatchFilter> {
    constructor(log: Log, protected matchService: MatchService) {
        super(log, matchService);
        this.addProcessToMatch = this.addProcessToMatch.bind(this);
        this.updateProcess = this.updateProcess.bind(this);
        this.getMatchDetails = this.getMatchDetails.bind(this);    
        this.endMatch = this.endMatch.bind(this);        
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
            if(process.type && process.type === "offensive"){
                if(process.option === "3PT"){
                    if(!match[0].homeResult)
                    if(process.side === "home"){
                        match[0].homeResult = match[0].homeResult+  3
                    }else{
                        match[0].awayResult = match[0].awayResult+  3
                    }
                }else if (process.option === "2PT"){
                    if(process.side === "home"){
                        match[0].homeResult = match[0].homeResult + 2 
                    }else{
                        match[0].awayResult  = match[0].awayResult + 2 
                    }
                }else{
                    if(process.side === "FT"){
                        match[0].homeResult =  match[0].homeResult +  1 
                    }else{
                        match[0].awayResult =  match[0].awayResult + 1 
                    }
                }
            }
    
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

        const homeTeam = await this.matchService.getTeamById(matches[0].home as string);
        if(!homeTeam || homeTeam.length ===0) matches[0].home =[] as any

        const awayTeam = await this.matchService.getTeamById(matches[0].away as string);
        if(!awayTeam || awayTeam.length ===0) matches[0].away =[] as any

        const teamMerge = [homeTeam[0],awayTeam[0]]

        const  playerOnTeams = await Promise.all(teamMerge.map(async team => await this.matchService.getPlayerByTeamId(team.id)))
        teamMerge[0].players = playerOnTeams[0]
        teamMerge[1].players = playerOnTeams[1]

        let teamHomeString =[] as string[]
        let teamAwayString =[] as string[]


        if(matches[0].homeLineUp && matches[0].homeLineUp.length !== 0){
            teamHomeString = matches[0].homeLineUp.map(pl => pl.id)
        }
        if(matches[0].awayLineUp && matches[0].awayLineUp.length !== 0){
            teamAwayString = matches[0].awayLineUp.map(pl => pl.id)
        }


       const homeLineUp = [] as Player[]
       const awayLineUp = [] as Player[]

        // let homeLineUp = teamMerge[0].players.map(pl => {if(teamHomeString.indexOf(pl.id) !== -1) return pl})
       for( const hp of teamMerge[0].players){
            if(teamHomeString.indexOf(hp.id) !== -1){
                homeLineUp.push(hp)
            }
       }
       for( const ap of teamMerge[1].players){
        if(teamAwayString.indexOf(ap.id) !== -1){
            awayLineUp.push(ap)
        }
    }
        // let awayLineUp = teamMerge[1].players.map(pl => {if(teamAwayString.indexOf(pl.id) !== -1) return pl})

        
        matches[0].homeLineUp = homeLineUp
        matches[0].awayLineUp =awayLineUp
        // const player= await this.matchService.getPlayerByTeamId(te)


		matches[0].home = teamMerge[0]
		matches[0].away = teamMerge[1]
		
        const processes = await this.matchService.getProcessByMatchId(matches[0].id);
        if(processes.length === 0){
            return res.status(200).json(matches[0])
        }
``
        for(const p of processes){
            p.playerOne = teamMerge[0].players.find(pl => pl.id === p.playerOne) as Player ?? teamMerge[1].players.find(pl => pl.id === p.playerOne)  as Player ?? p.playerOne
            p.playerTwo = teamMerge[0].players.find(pl => pl.id === p.playerTwo) as Player ?? teamMerge[1].players.find(pl => pl.id === p.playerTwo)  as Player ?? p.playerTwo
        }
        
        matches[0].process = processes
   
        return res.status(200).json(matches[0])
    }
    async endMatch(req: Request, res: Response) {
        const match = req.body as Match

        const isEndMatch = await this.matchService.endMatch(match)

        if(isEndMatch ===0) {
            return res.status(400).json({err: "End Match Failed"})
        }

        return res.status(200).json({message: "End Match Success"})

        
     
    }
}
