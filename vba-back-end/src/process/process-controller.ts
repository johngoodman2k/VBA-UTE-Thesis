import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { Process, ProcessFilter, ProcessService } from "./process";

export class ProcessController extends Controller<Process, string, ProcessFilter> {
  constructor(log: Log, protected processService: ProcessService) {
    super(log, processService);
    this.getProcessesByMatchId = this.getProcessesByMatchId.bind(this);
  }

  async getProcessesByMatchId(req:Request, res:Response){
    const {id} = req.params;
    const process = await this.processService.getProcessesByMatchId(id);
    if(!process) return res.status(404).json({err: "Process not found"});
    return res.status(200).json(process);
  }
}
