import { userModel } from "../authenticate/authenticate";
import { buildToInsert, buildToUpdate, DB, Repository } from "query-core";
import { Post, postModel, PostRepository,User } from "./post";

export class SqlPostRepository
  extends Repository<Post, string>
  implements PostRepository
{
  constructor(db: DB) {
    super(db, "posts", postModel);

  }
  createPost(post:Post,posts:Post[]):Promise<number> {
    const q1 = buildToInsert(post,"posts", postModel,this.param)
    const q2 = buildToUpdate({id: post.owner ,posts: posts},"users", userModel,this.param)
    return this.execBatch([q1,q2]).then(c => c>0?1:0)
  }
}

// select * from players where teams @> $1`