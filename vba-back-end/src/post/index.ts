import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
import { buildQuery } from "./query";

export * from "./post";
export { PostController };
import { SqlPostRepository } from "./sql-post-repository";
import { Post, PostFilter, postModel, PostRepository, PostService } from "./post";
import { PostController } from "./post-controller";

export class PostManager
    extends Manager<Post, string, PostFilter>
    implements PostService
{
    constructor(
        search: Search<Post, PostFilter>,
        protected postrepository: PostRepository
    ) {
        super(search, postrepository);
    }
    createPost(post:Post,posts:Post[]):Promise<number>{
        return this.postrepository.createPost(post,posts)
    }

}
export function usePostService(db: DB): PostService {
    const builder = new SearchBuilder<Post, PostFilter>(
        db.query,
        "posts",
        postModel,
        postgres,
        buildQuery
    );
    const postrepository = new SqlPostRepository(db);
    return new PostManager(builder.search, postrepository);
}
export function usePostController(log: Log, db: DB): PostController {
    return new PostController(log, usePostService(db));
}
