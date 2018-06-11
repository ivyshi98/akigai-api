import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { PostsRepository } from "../repositories/posts.repository";
import { Posts } from "../models/posts";
import { FollowsRepository } from '../repositories/follows.repository';


export class PostsController {
  constructor(
    @repository(PostsRepository.name) private postsRepo: PostsRepository,
    @repository(FollowsRepository.name) private followsRepo: FollowsRepository
  ) {
  }

  @get('/posts/{userId}')
  async findCharityPosts(
    @param.query.number('userId') userId: number) {
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
  
  }

  @post('/posts')
  async createPost(@requestBody() post: Posts) {
    return await this.postsRepo.create(post);
  }
}
