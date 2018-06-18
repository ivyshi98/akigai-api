import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { CharitiesRepository } from "../repositories/charities.repository";
import { Charities } from "../models/charities";
import { sign, verify } from 'jsonwebtoken';

export class CharitiesController {
  constructor(
    @repository(CharitiesRepository.name) private charitiesRepo: CharitiesRepository
  ) {}
  
  // @get('/searchCharities')
  
  // async searchCharities(@param.query.string('queryText') queryText: string): Promise<Charities[]> {
  //  // if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');
    
  //   try {
  //     //var jwtBody = verify(jwt, 'encryption');

  //     var allCharities = await this.charitiesRepo.find();
  //     for (var i = 0, i < ){

  //     }
      
  //   } catch (err) {
  //     throw new HttpErrors.BadRequest('JWT token invalid');
  //   }
  //   }




  //get all charities
  //for charity list page
  @get('/allCharities')
    
  async findCharities(@param.query.string('jwt') jwt: string): Promise<Charities[]> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');
    var allCharities = await this.charitiesRepo.find();
    try {
      var jwtBody = verify(jwt, 'encryption');
      return await this.charitiesRepo.find();
      
    } catch (err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }
    }

  //create new charities
    @post('/charities')
    async postCharities (@requestBody() charity: Charities) {
    return await this.charitiesRepo.create(charity);
  }

  //get one charity by charity id
  //for charity detail page
  @get('/charity/{id}') //:id
        async findCharityById(@param.path.number('id') id: number): Promise<Charities> {
            let idExists: boolean = !!(await this.charitiesRepo.count({id}));
            if (!idExists){
                throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
            }
            return await this.charitiesRepo.findById(id);
        }
  
 //add charity to user favourite list 
 //for favourite on charity list page 
//  @post()
//   async addCharityToFavourite()
} 

