import { get, post, requestBody } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/users.repository";
import { Users } from "../models/users";

export class RegistrationController {
  constructor(
    @repository(UsersRepository.name) private userRepo: UsersRepository
  ) {
  }

  @post("/registration")
  async requestRegistration (@requestBody() user: Users) {
    return await this.userRepo.create(user);
  }
}
