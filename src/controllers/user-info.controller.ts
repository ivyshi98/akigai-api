import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { Users } from "../models/users";
import { sign, verify } from 'jsonwebtoken';

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
  }