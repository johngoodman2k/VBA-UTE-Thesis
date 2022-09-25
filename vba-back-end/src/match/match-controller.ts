import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { nanoid } from "nanoid";
import { findAncestor } from "typescript";
import { Match, MatchFilter, MatchService, Process } from "./match";

export class MatchController extends Controller<Match, string, MatchFilter> {
  constructor(log: Log, protected matchService: MatchService) {
    super(log, matchService);
    this.getMatches = this.getMatches.bind(this);
    this.addProcessToMatch = this.addProcessToMatch.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
  }
  getMatches(req: Request, res: Response) {
    const tournamentId = "";
    const round = "";
    this.matchService
      .getMatches(tournamentId, round)
      .then((matches) => {
        res.status(200).json(matches).end();
      })
      .catch((err) => handleError(err, res, this.log));
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
      await this.matchService.updateMatch(matches[0].id, matches[0].process);
      await this.matchService.updateProcess(process);
      return res.status(200).json(process);
    }
  }
}
