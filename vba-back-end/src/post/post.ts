import { Attributes, Filter, Repository, Service } from "onecore";
// import { Team } from "../team/team";

export interface Post {
    id?: string;
    name?: string
    tinydes?:string,
    description?: string,
    public?:boolean,
    image?:string,
    owner?: string,
}

interface User {
    id?:string
}

export interface PostRepository extends Repository<Post, string> {
    
}
export interface UserRepository extends Repository<User, string> {
    
}
export interface PostService extends Service<Post, string, PostFilter> {

}
export const postModel: Attributes = {
    id: {type : "string"},
    name: {type : "string"},
    tinydes:{type : "string"},
    description: {type : "string"},
    public:{type: "boolean"},
    image:{type : "string"},
    owner: {type: "array"},
};

export interface PostFilter extends Filter {
    id?: string;
    name?: string
    tinydes?:string,
    description?: string,
    public?:boolean,
    image?:string,
    owner?: string,
}