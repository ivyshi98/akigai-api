import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { FollowsRepository } from "../repositories/follows.repository";
import { verify } from "jsonwebtoken";
import { Follows } from "../models/follows";
import { CharitiesRepository } from "../repositories/charities.repository";
import { Charities } from "../models/charities";

export class Controller {
  constructor(
    @repository(FollowsRepository.name) private followsRepo: FollowsRepository,
    @repository(CharitiesRepository.name) private charitiesRepo: CharitiesRepository
  ) { }


  //create new user and charity matching 
  @post('/favourite/{charityId}')
  async addUserFavourites(
    @param.query.number('charityId') charityId: number,
    @param.query.string('jwt') jwt: string
    ): Promise<any> {
    try {
      var jwtBody = verify(jwt, 'encryption') as any;

      var newFavouriteCharity = new Follows();
      newFavouriteCharity.charityId = charityId;
      newFavouriteCharity.userId = jwtBody.user.id;

      var favouriteCharity = await this.followsRepo.create(newFavouriteCharity);
      return favouriteCharity
    }
    catch (err) {
      throw new HttpErrors.BadRequest('User invalid');
    }


  }


  //"http://localhost:3000/favourites/{userId}?jwt="
  //get charity ids by user id 
  @get('/favourite')
  async findUserFavourites(
    @param.query.string('jwt') jwt: string):Promise<Array<Charities>> {
    var jwtBody = verify(jwt, 'encryption') as any;

    //find the rows with user id
    var userFollowed = await this.followsRepo.find({ where: { userId: jwtBody.user.id } });
   
    var charitiesFollowed: number[] = [];

    var favouriteCharitiesList = new Array();
     //put all charity ids associated with user id into an array
    for (var i = 0; i < userFollowed.length; i++) {
      // for (var x = 0; x <charitiesFollowed.length; x++){
      //   //Check if charity is already in the favourite list
      //   if (userFollowed[i].charityId != charitiesFollowed[x]){
      //     charitiesFollowed.push(userFollowed[i].charityId);
      //   }
      // }
      charitiesFollowed.push(userFollowed[i].charityId);  
    }

    //traverse through the charity ids array to get these charities 
    for (var i = 0; i < charitiesFollowed.length; i++) {
      favouriteCharitiesList.push(await this.charitiesRepo.findById(charitiesFollowed[i]));
      console.log(favouriteCharitiesList);

    }

    return favouriteCharitiesList;

  }

}