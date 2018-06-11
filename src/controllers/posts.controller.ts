import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { PostsRepository } from "../repositories/posts.repository";
import { Posts } from "../models/posts";
import { FollowsRepository } from '../repositories/follows.repository';
import { sign, verify } from 'jsonwebtoken';

export class PostsController {
  constructor(
    @repository(PostsRepository.name) private postsRepo: PostsRepository,
    @repository(FollowsRepository.name) private followsRepo: FollowsRepository
  ) {
  }

  @get('/posts/{userId}')
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

      var followedPosts = await this.postsRepo.find({
        where: {
          charityId: { inq: charitiesFollowed }
        }
      });
      {
        return followedPosts
      }

    } catch(err) {
    throw new HttpErrors.BadRequest('JWT token invalid');
  }

}

@post('/posts')
async createPost(@requestBody() post: Posts) {
  return await this.postsRepo.create(post);
}
}
