import { buildToUpdate, DB, Repository } from "query-core";
import { Post, postModel, PostRepository } from "./post";

export class SqlPostRepository
  extends Repository<Post, string>
  implements PostRepository
{
  constructor(db: DB) {
    super(db, "posts", postModel);

  }
}

// select * from players where teams @> $1`