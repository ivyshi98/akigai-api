import { UsersRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class UserInfoController {
    private usersRepo;
    constructor(usersRepo: UsersRepository);
    getUser(jwt: string): Promise<string | object>;
    updateUser(jwt: string, obj: Partial<Users>): Promise<any>;
}
