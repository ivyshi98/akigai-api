import { UsersRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class RegistrationController {
    private usersRepo;
    constructor(usersRepo: UsersRepository);
    requestRegistration(user: Users): Promise<Users>;
}
