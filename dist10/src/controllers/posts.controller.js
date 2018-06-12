"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const repository_1 = require("@loopback/repository");
const posts_repository_1 = require("../repositories/posts.repository");
const posts_1 = require("../models/posts");
const follows_repository_1 = require("../repositories/follows.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
let PostsController = class PostsController {
    constructor(postsRepo, followsRepo) {
        this.postsRepo = postsRepo;
        this.followsRepo = followsRepo;
    }
    async findCharityPosts(userId, jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            console.log(jwtBody);
            var userFollowed = await this.followsRepo.find({ where: { userId: userId } });
            var charitiesFollowed = [];
            for (var i = 0; i < userFollowed.length; i++) {
                charitiesFollowed.push(userFollowed[i].charityId);
            }
            var followedPosts = await this.postsRepo.find({
                where: {
                    charityId: { inq: charitiesFollowed }
                }
            });
            {
                return followedPosts;
            }
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    async createPost(post) {
        return await this.postsRepo.create(post);
    }
};
__decorate([
    rest_1.get('/posts/{userId}'),
    __param(0, rest_1.param.query.number('userId')),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findCharityPosts", null);
__decorate([
    rest_1.post('/posts'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_1.Posts]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
PostsController = __decorate([
    __param(0, repository_1.repository(posts_repository_1.PostsRepository.name)),
    __param(1, repository_1.repository(follows_repository_1.FollowsRepository.name)),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        follows_repository_1.FollowsRepository])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map