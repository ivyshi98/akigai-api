import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { PostsRepository } from "../repositories/posts.repository";
import { Posts } from "../models/posts";
import { FollowsRepository } from '../repositories/follows.repository';


export class PostsController {
  constructor() {}
}
