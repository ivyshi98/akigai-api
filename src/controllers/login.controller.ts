import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { post, requestBody, HttpErrors, get } from "@loopback/rest";
import { Login } from "../models/login";
import { sign, verify} from 'jsonwebtoken'

import * as bcrypt from 'bcrypt';

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
            ],
        }));

        if (!userExists) {
            throw new HttpErrors.Unauthorized('user does not exist');
        }


        var currentUser = await this.userRepo.findOne({where: {username: login.username}});

        if (await bcrypt.compare(login.password, currentUser.password)) {

        var jwt = sign(
            {
              user: {
                id: currentUser.id,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                username: currentUser.username,
                email: currentUser.email
              },
            },
            'encryption',
            {
              issuer: 'auth.akigai',
              audience: 'akigai',
            },
          );
          
          return {
            token: jwt,
          };

        }

        throw new HttpErrors.Unauthorized('Incorrect password.');
    }

    @post('/checkUser')
    async checkUser(@requestBody() login: Login): Promise<any> {

        var credentials = {
            invalid: false,
            notExist: false,
        };

        if (!login.username || !login.password) {
            credentials.invalid = true;
        }

        let userExists: boolean = !!(await this.userRepo.count({
            and: [
                { username: login.username },
            ],
        }));

        if (!userExists) {
            credentials.notExist = true;
        }

        return credentials;

    }
}
