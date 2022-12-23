import { Controller, Log } from "express-ext";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { deleteFile } from "../../common/deleteFile";
import { Post, PostFilter, PostService } from "./post";

export class PostController extends Controller<Post, string, PostFilter> {
  constructor(log: Log, protected postService: PostService) {
    super(log, postService);
    // this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
  }
  create(req: Request, res: Response): void {
  }

}
