import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { get, post, patch, requestBody, HttpErrors, param } from "@loopback/rest";
import { Users } from "../models/users";
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class UserInfoController {

  constructor(
    @repository(UsersRepository.name) private usersRepo: UsersRepository
  ) {}

  @get('/User')
    async getUser(@param.query.string('jwt') jwt: string) {
      if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

      try {
        var jwtBody = verify(jwt, 'encryption');
        return jwtBody;

      } catch (err) {
        throw new HttpErrors.BadRequest('JWT token invalid');
      }
    }

    @patch('/updateUser') 
    async updateUser(
      @param.query.string('jwt') jwt: string,
      @requestBody() obj: Partial<Users>): Promise<any> {
      if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

      try {
        var jwtBody = verify(jwt, 'encryption') as any;
        await this.usersRepo.updateById(jwtBody.user.id, obj);
        var changedUser = await this.usersRepo.findById(jwtBody.user.id);

        if (changedUser.password.length < 15) {
          let hashedPassword = await bcrypt.hash(changedUser.password, 10);
          obj.password = hashedPassword;
          await this.usersRepo.updateById(changedUser.id, obj);
        }
        
        var jwt = sign(
          {
            user: {
              id: changedUser.id,
              firstname: changedUser.firstname,
              lastname: changedUser.lastname,
              username: changedUser.username,
              email: changedUser.email
            },
          },
          'encryption',
          {
            issuer: 'auth.akigai',
            audience: 'akigai',
          },
        );

        console.log(jwt)
        
        return {
          token: jwt,
        };

      } catch (err) {
        throw new HttpErrors.BadRequest('JWT token invalid');
      }
    }
  }