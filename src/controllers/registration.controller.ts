import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { post, requestBody, HttpErrors } from "@loopback/rest";
import { Users } from "../models/users";

export class RegistrationController {

    constructor(
        @repository(UsersRepository.name) private userRepo: UsersRepository
    ) { }

    @post('/registration')
    async createUser(@requestBody() newUser: Users): Promise<any> {

        if (!newUser.username || !newUser.firstname || !newUser.lastname || !newUser.email || !newUser.password) {
            throw new HttpErrors.BadRequest('missing data');
          }
      
          let userExists: boolean = !!(await this.userRepo.count(
            { username: newUser.username } || { email: newUser.email }
            ));
      
          if (userExists) {
            throw new HttpErrors.BadRequest('user already exists');
          }
          
        return await this.userRepo.create(newUser);
    }
}
