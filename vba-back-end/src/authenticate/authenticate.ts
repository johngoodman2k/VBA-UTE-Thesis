import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
import { nanoid } from "nanoid";

export interface User {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    name?: string;
    image?: string;
    role?: number;
    lock?: boolean;
    resetLink?: string;
    otp?: string;
    otpFG?: string;
    activated?: boolean;
    posts?: Post;

}
export interface Post{
    id? :string;
}

export interface UserRepository extends Repository<User, string> {
    findOne(field: string, fieldValue: string): Promise<User[]>;
    createUser(user: User, ctx?: any): Promise<number>;
    updateUser(user: User, ctx?: any): Promise<number>;
}

export interface UserService extends Service<User, string, UserFilter> {
    findOne(field: string, fieldValue: string): Promise<User[]>;
    createUser(user: User, ctx?: any): Promise<number>;
    updateUser(user: User, ctx?: any): Promise<number>;
}

export const userModel: Attributes = {
    id: {
        key: true,
        type: "string",
        match: "equal",
        default: nanoid(),
    },
    username: {
        type: "string",
    },
    password: {
        type: "string",
    },
    email: {
        type: "string",
    },
    name: {
        type: "string",
        default: null,
    },
    image: {
        type: "string",
    },
    role: {
        type: "number",
        default: 0,
    },
    lock: {
        type: "boolean",
        default: false,
    },
    resetLink: {
        type: "string",
        default: "",
    },
    otp: {
        type: "string",
        default: "",
    },
    otpFG: {
        type: "string",
        default: "",
    },
    activated: {
        type: "boolean",
        default: false,
    },
    posts:{
        type: "array"
    }
};

export interface UserFilter extends Filter {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    name?: string;
    image?: string;
    role?: number;
    lock?: boolean;
    resetLink?: string;
    otp?: string;
    otpFG?: string;
    activated?: boolean;
}
