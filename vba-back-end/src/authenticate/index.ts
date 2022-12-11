import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
// import { buildQuery } from "./query";
import { User, UserFilter, userModel, UserRepository, UserService } from "./authenticate";
import { UserController } from "./authenticate-controller";
import { SqlUserRepository } from "./sql-authenticate-repository";
import { config as Config, env as Env } from "../config";
export { UserController };

export * from "./authenticate";

export class UserManager extends Manager<User, string, UserFilter> implements UserService {
    constructor(search: Search<User, UserFilter>, protected userRepository: UserRepository) {
        super(search, userRepository);
    }
    findOne(field: string, fieldValue: string): Promise<User[]> {
        return this.userRepository.findOne(field, fieldValue);
    }
    createUser(user: User, ctx?: any): Promise<number> {
        return this.userRepository.createUser(user, ctx);
    }
    updateUser(user: User, ctx?: any): Promise<number> {
        return this.userRepository.updateUser(user, ctx);
    }
}
export function useUserService(db: DB): UserService {
    const builder = new SearchBuilder<User, UserFilter>(db.query, "users", userModel, postgres);
    const userRepository = new SqlUserRepository(db);

    return new UserManager(builder.search, userRepository);
}
export function useUserController(log: Log, db: DB, config: typeof Config): UserController {
    return new UserController(log, useUserService(db), config);
}
