import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { Process, ProcessFilter, ProcessService } from "./process";

export class ProcessController extends Controller<Process, string, ProcessFilter> {
  constructor(log: Log, protected processService: ProcessService) {
    super(log, processService);
  }
}
