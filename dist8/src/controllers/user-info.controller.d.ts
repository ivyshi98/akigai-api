import { UsersRepository } from "../repositories/users.repository";
export declare class UserInfoController {
    private usersRepo;
    constructor(usersRepo: UsersRepository);
    getUser(jwt: string): Promise<string | object>;
}
