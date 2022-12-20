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
        const { matchId } = req.params;
        const process = req.body;

        if (Object.keys(process).length === 0) {
            return res.status(400).json({ err: "Process is empty" });
        }

        const newProcess = process.map((_item) => ({
            ..._item,
            id: nanoid(),
            createdAt: new Date(Date.now()),
        }));

        const matches = await this.matchService.getMatchById(matchId);

        const newProcess1 = new Array<Process>();
        if (matches[0].process === null) {
            newProcess1.push(...newProcess);
        } else {
            newProcess1.push(...matches[0].process.concat(newProcess));
            // console.log("OK!");
            // console.log(newPlayers1);
        }

        const result = await this.matchService.updateMatch(
            matches[0].id,
            newProcess1
        );
        // console.log(result);

        const newProcess3 = newProcess.map((_item) => ({
            ..._item,
            match: matchId,
        }));

        // console.log(newPlayers);

        const result1 = await this.matchService.addProcess(newProcess3);
        return res.status(200).json(newProcess3);
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
        const matches = await this.matchService.getMatchDetails(id);
        if(!matches) return res.status(404).json({ err: "Match not found" });
        if(matches.length ===0) return res.status(200).json(matches);
        const homeId= matches[0].home
        const awayId = matches[0].away
        const home = await this.matchService.getTeamByMatchId(homeId as string)
        const away = await this.matchService.getTeamByMatchId(awayId as string)

        matches[0].home = home as any
        matches[0].away = away as any
        if(!home || home.length ===0) matches[0].home = await this.matchService.getTeamById(homeId as string) as any
        if(!away || away.length ===0) matches[0].home = await this.matchService.getTeamById(awayId as string) as any

        
        return res.status(200).json(matches[0])
    }
}
