import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { post, requestBody, HttpErrors } from "@loopback/rest";
import { Users } from "../models/users";

import * as bcrypt from 'bcrypt';

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

          let hashedPassword = await bcrypt.hash(newUser.password, 10);

        var userToStore = new Users();
        userToStore.id = newUser.id;
        userToStore.firstname = newUser.firstname;
        userToStore.lastname = newUser.lastname;
        userToStore.email = newUser.email;
        userToStore.password = hashedPassword;

        let storedUser = await this.userRepo.create(userToStore);
        storedUser.password = "";
          
        return await this.userRepo.create(storedUser);
    }
}

