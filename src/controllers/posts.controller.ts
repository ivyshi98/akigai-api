import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { PostsRepository } from "../repositories/posts.repository";
import { Posts } from "../models/posts";
import { FollowsRepository } from '../repositories/follows.repository';
import { CharitiesRepository } from '../repositories/charities.repository';
import { sign, verify } from 'jsonwebtoken';
import { Charities } from '../models/charities';

export class PostsController {
  constructor(
    @repository(PostsRepository.name) private postsRepo: PostsRepository,
    @repository(FollowsRepository.name) private followsRepo: FollowsRepository,
    @repository(CharitiesRepository.name) private charitiesRepo: CharitiesRepository
  ) {
  }

  @get('/posts')
  async findCharityPosts(
    @param.query.number('userId') userId: number,
    @param.query.string('jwt') jwt: string) {

    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

    try {
      var jwtBody = verify(jwt, 'encryption');
      console.log(jwtBody);

      var userFollowed = await this.followsRepo.find({ where: { userId: userId } });
      var charitiesFollowed: number[] = [];
      for (var i = 0; i < userFollowed.length; i++) {
        charitiesFollowed.push(userFollowed[i].charityId);
      }

      /////////
      var allCharities = await this.charitiesRepo.find();
      var charityIdToName: { [key: number]: string } = {}; // charity ID -> charity name
      var postProperties: Array<object> = [];
      var followedPosts = await this.postsRepo.find({
        where: {
          charityId: { inq: charitiesFollowed }
        }
      });

      for (var i = 0; i < allCharities.length; ++i) {
        let charity = allCharities[i];
        charityIdToName[charity.id as number] = charity.name;
      }

      for (var i = 0; i < followedPosts.length; ++i) {
        let { id, text, img, charityId, date } = followedPosts[i];
        postProperties.push({
          id,
          text,
          img,
          date,
          charityName: charityIdToName[charityId as number],
        });
      }

      return postProperties;
      ////////

      // var followedPosts = await this.postsRepo.find({
      //   where: {
      //     charityId: { inq: charitiesFollowed }
      //   }
      // });

      // var postsProperties: Array<object> = [];
      // var intermediate: object;
      
      // for (var i = 0; i < followedPosts.length; i++) {
      //   var postsId = followedPosts[i].id;
      //   var postsText = followedPosts[i].text;
      //   var postsImg = followedPosts[i].img;
      //   var charityId = followedPosts[i].charityId;
      //   var charityName = 

      //   for (var j=0; j < allCharities.length; j++) {
      //     if (allCharities[j].charityId = followedPosts[i].charityId) {
      //       var charityName = allCharities[j].name;

      //       intermediate = {
      //         id: <number> postsId,
      //         text: <string> postsText,
      //         img: <string> postsImg,
      //         charityName: <string> charityName,
      //       }

      //       postsProperties.push(intermediate);

      //     }
      //   }
        
      // }
      

      // {
      //   return postsProperties
      // }


    } catch(err) {
    throw new HttpErrors.BadRequest('JWT token invalid');
  }

}

@post('/posts')
async createPost(@requestBody() post: Posts) {
  return await this.postsRepo.create(post);
}
}
