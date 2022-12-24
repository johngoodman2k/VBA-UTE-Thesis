import { Controller, Log } from "express-ext";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { deleteFile } from "../../common/deleteFile";
import { Post, PostFilter, PostService } from "./post";
import { nanoid } from "nanoid";

export class PostController extends Controller<Post, string, PostFilter> {
  constructor(log: Log, protected postService: PostService) {
    super(log, postService);
    // this.getPlayersByTeamId = this.getPlayersByTeamId.bind(this);
  }
  async create(req: Request, res: Response) {
    const post = req.body as Post
    // const saveUrl = post.image
    if(req.file){
      post.image = req.file["firebaseUrl"]
    }
    post.id=nanoid()
    const userPost = [] as Post[]
    userPost.push({id:post.id})
    const posts = await  this.postService.createPost(post,userPost);
    if(posts === 0) {
      if(req.file && req.file["firebaseUrl"]) deleteFile(req.file["firebaseUrl"])
      return res.status(404).json({err: "Post created failed"})
    }

    return  res.status(200).json({message: "Post created successfully"})
  }

}
