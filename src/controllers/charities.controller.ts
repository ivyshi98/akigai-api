import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { CharitiesRepository } from "../repositories/charities.repository";
import { Charities } from "../models/charities";

export class CharitiesController {
  constructor(
    @repository(CharitiesRepository.name) private charitiesRepo: CharitiesRepository
  ) {}

  @get('/allCharities')
    async findCharities(): Promise<Charities[]> {
    return await this.charitiesRepo.find();
    }

    @post("/charities")
    async postCharities (@requestBody() charity: Charities) {
    return await this.charitiesRepo.create(charity);
  }
}

