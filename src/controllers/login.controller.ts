import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { post, requestBody, HttpErrors } from "@loopback/rest";
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

        var users = await this.userRepo.find();

        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.username == login.username && await bcrypt.compare(login.password, user.password)) {
                //return user;
                var jwt = sign(
                {
                  user: {
                    id: user.id,
                    firstname: user.firstname,
                    email: user.email
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
   
            }
        }
    }