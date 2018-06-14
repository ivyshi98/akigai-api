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
const follows_repository_1 = require("../repositories/follows.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const follows_1 = require("../models/follows");
const charities_repository_1 = require("../repositories/charities.repository");
const charities_1 = require("../models/charities");
let FollowsController = class FollowsController {
    constructor(followsRepo, charitiesRepo) {
        this.followsRepo = followsRepo;
        this.charitiesRepo = charitiesRepo;
    }
    //create new user and charity matching 
    async addUserFavourites(charityId, jwt) {
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            var newFavouriteCharity = new follows_1.Follows();
            newFavouriteCharity.charityId = charityId;
            newFavouriteCharity.userId = jwtBody.user.id;
            var favouriteCharity = await this.followsRepo.create(newFavouriteCharity);
            return favouriteCharity;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('User invalid');
        }
    }
    //"http://localhost:3000/favourites/{userId}?jwt="
    //get charity ids by user id 
    async findUserFavourites(jwt) {
        var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
        //find the rows with user id
        var userFollowed = await this.followsRepo.find({ where: { userId: jwtBody.user.id } });
        var charitiesFollowed = [];
        var favouriteCharities = new charities_1.Charities();
        //put all charity ids associated with user id into an array
        for (var i = 0; i < userFollowed.length; i++) {
            charitiesFollowed.push(userFollowed[i].charityId);
        }
        //traverse through the charity ids array to get these charities 
        for (var i = 0; i < charitiesFollowed.length; i++) {
            favouriteCharities = await this.charitiesRepo.findById(charitiesFollowed[i]);
        }
        return favouriteCharities;
    }
};
__decorate([
    rest_1.post('/favourites/{charityId}'),
    __param(0, rest_1.param.query.number('charityId')),
    __param(1, rest_1.param.query.number('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FollowsController.prototype, "addUserFavourites", null);
__decorate([
    rest_1.get('/favourites/{userId}'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowsController.prototype, "findUserFavourites", null);
FollowsController = __decorate([
    __param(0, repository_1.repository(follows_repository_1.FollowsRepository.name)),
    __param(1, repository_1.repository(charities_repository_1.CharitiesRepository.name)),
    __metadata("design:paramtypes", [follows_repository_1.FollowsRepository,
        charities_repository_1.CharitiesRepository])
], FollowsController);
exports.FollowsController = FollowsController;
//# sourceMappingURL=follows.controller.js.map