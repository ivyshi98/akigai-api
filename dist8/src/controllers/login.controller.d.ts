import { UsersRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class LoginController {
    private userRepo;
    constructor(userRepo: UsersRepository);
    loginUser(user: Users): Promise<Users>;
}
