import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { CharitiesRepository } from "../repositories/charities.repository";
import { Charities } from "../models/charities";
import { sign, verify } from 'jsonwebtoken';

export class CharitiesController {
  constructor(
    @repository(CharitiesRepository.name) private charitiesRepo: CharitiesRepository
  ) {}

  @get('/allCharities')
    
  async findCharities(@param.query.string('jwt') jwt: string): Promise<Charities[]> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

    try {
      var jwtBody = verify(jwt, 'encryption');
      console.log(jwtBody);
      return await this.charitiesRepo.find();
    } catch (err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }
    }

    @post("/charities")
    async postCharities (@requestBody() charity: Charities) {
    return await this.charitiesRepo.create(charity);
  }
}

