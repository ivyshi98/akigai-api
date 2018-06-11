import { get, post, requestBody, HttpErrors } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
import { Login } from "../models/login";

export class LoginController {
  constructor(
    @repository(UsersRepository.name) private userRepo: UsersRepository
  ) {
  }

  @post('/login')
  async loginUser (@requestBody() user: Users): Promise<Users> {
    if (!user.username || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { username: user.username } ,
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    return await this.userRepo.findOne({
      where: {
        and: [
          { username: user.username },
          { password: user.password }
        ],
      }
    })
  } 
}
