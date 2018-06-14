import { PostsRepository } from "../repositories/posts.repository";
import { Posts } from "../models/posts";
import { FollowsRepository } from '../repositories/follows.repository';
export declare class PostsController {
    private postsRepo;
    private followsRepo;
    constructor(postsRepo: PostsRepository, followsRepo: FollowsRepository);
    findCharityPosts(userId: number, jwt: string): Promise<Posts[]>;
    createPost(post: Posts): Promise<Posts>;
}
