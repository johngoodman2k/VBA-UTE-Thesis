import { DB, Repository } from "query-core";
import { User, userModel, UserRepository } from "./authenticate";

export class SqlUserRepository extends Repository<User, string> implements UserRepository {
    constructor(db: DB) {
        super(db, "users", userModel);
    }
    findOne(field: string, fieldValue: string): Promise<User[]> {
        return this.query<User>(`select * from users where ${field} = $1`, [fieldValue]);
    }
    createUser(user: User, ctx?: any): Promise<number> {
        return this.insert(user, ctx);
    }
}
