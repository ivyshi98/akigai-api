import { UsersRepository } from "../repositories/users.repository";
import { Login } from "../models/login";
export declare class LoginController {
    private userRepo;
    constructor(userRepo: UsersRepository);
    login(login: Login): Promise<any>;
}
