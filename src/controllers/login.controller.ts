import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { post, requestBody, HttpErrors } from "@loopback/rest";
import { Login } from "../models/login";

export class LoginController {

    constructor(
        @repository(UsersRepository.name) private userRepo: UsersRepository
    ) { }

    @post('/login')
    async login(@requestBody() login: Login): Promise<any> {

        if (!login.username || !login.password) {
            throw new HttpErrors.Unauthorized('invalid credentials');
        }

        let userExists: boolean = !!(await this.userRepo.count({
            and: [
                { username: login.username },
                { password: login.password },
            ],
        }));

        if (!userExists) {
            throw new HttpErrors.Unauthorized('invalid credentials');
        }

        return await this.userRepo.findOne({
            where: {
                and: [
                    { username: login.username },
                    { password: login.password }
                ],
            },
        });
    }
}
