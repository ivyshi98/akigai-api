import { PostsRepository } from "../repositories/posts.repository";
import { Posts } from "../models/posts";
import { FollowsRepository } from '../repositories/follows.repository';
import { CharitiesRepository } from '../repositories/charities.repository';
export declare class PostsController {
    private postsRepo;
    private followsRepo;
    private charitiesRepo;
    constructor(postsRepo: PostsRepository, followsRepo: FollowsRepository, charitiesRepo: CharitiesRepository);
    findCharityPosts(jwt: string): Promise<object[]>;
    createPost(post: Posts): Promise<Posts>;
}
