import { get, post, requestBody, HttpErrors, param, del } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { FollowsRepository } from "../repositories/follows.repository";
import { verify } from "jsonwebtoken";
import { Follows } from "../models/follows";
import { CharitiesRepository } from "../repositories/charities.repository";
import { Charities } from "../models/charities";

export class FavouriteController {
  constructor(
    @repository(FollowsRepository.name) private followsRepo: FollowsRepository,
    @repository(CharitiesRepository.name) private charitiesRepo: CharitiesRepository
  ) { }


  //create new user and charity matching 
  @post('/favourite')
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


   //get charity is already favourited by user
   @get('/checkfavourite')
   async checkFavourites(
     @param.query.number ('charityId') charityId: number,
     @param.query.string('jwt') jwt: string):Promise<boolean> {
     var jwtBody = verify(jwt, 'encryption') as any;
 
     //find the rows with user id
     var checkCharity = await this.followsRepo.find({ 
       where: { 
         userId: jwtBody.user.id,
        charityId: charityId} });
      console.log(checkCharity);
      if (checkCharity){
        return true;
      }else{
        return false;
      }
   }


  //delete favourite charities
  @del('/deletefavourite')
  async deleteUserFavourites(
    @param.query.number('charityId') charityId: number,
    @param.query.string('jwt') jwt: string
    ){
    try {
      var jwtBody = verify(jwt, 'encryption') as any;
      var userFollowed = await this.followsRepo.find({ where: { userId: jwtBody.user.id } });
      var deleteCharity: any;

      for (var i = 0; i < userFollowed.length; i++) {
        if (userFollowed[i].charityId == charityId){
          deleteCharity = userFollowed[i];
          //await this.followsRepo.delete(userFollowed[i]);
          console.log(deleteCharity);
  
        } 
      }
      return await this.followsRepo.delete(deleteCharity);

    }
    catch (err) {
      throw new HttpErrors.BadRequest('User invalid');
    }
  }


}