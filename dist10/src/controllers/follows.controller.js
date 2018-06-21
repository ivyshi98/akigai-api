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
let FavouriteController = class FavouriteController {
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
    async checkFavourites(charityId, jwt) {
        var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
        //find the rows with user id
        //  try {
        var checkCharity = await this.followsRepo.find({
            where: {
                and: [
                    { userId: jwtBody.user.id },
                    { charityId: charityId }
                ]
            }
        });
        //   return true;
        //  } catch (err) {
        //    return false;
        //  }
        console.log(checkCharity);
        if (checkCharity.length > 0) {
            return { "favorite": true };
        }
        else {
            return { "favorite": false };
        }
    }
    //delete favourite charities
    //should we use path parameter?? 
    async deleteUserFavourites(charityId, jwt) {
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            var userFollowed = await this.followsRepo.find({ where: { userId: jwtBody.user.id } });
            var deleteCharity;
            for (var i = 0; i < userFollowed.length; i++) {
                if (userFollowed[i].charityId == charityId) {
                    deleteCharity = userFollowed[i];
                    //await this.followsRepo.delete(userFollowed[i]);
                    console.log(deleteCharity);
                }
            }
            return await this.followsRepo.deleteById(deleteCharity.id);
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('User invalid');
        }
    }
};
__decorate([
    rest_1.post('/favourite'),
    __param(0, rest_1.param.query.number('charityId')),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FavouriteController.prototype, "addUserFavourites", null);
__decorate([
    rest_1.get('/favourite'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavouriteController.prototype, "findUserFavourites", null);
__decorate([
    rest_1.get('/checkfavourite'),
    __param(0, rest_1.param.query.number('charityId')),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FavouriteController.prototype, "checkFavourites", null);
__decorate([
    rest_1.del('/deletefavourite'),
    __param(0, rest_1.param.query.number('charityId')),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FavouriteController.prototype, "deleteUserFavourites", null);
FavouriteController = __decorate([
    __param(0, repository_1.repository(follows_repository_1.FollowsRepository.name)),
    __param(1, repository_1.repository(charities_repository_1.CharitiesRepository.name)),
    __metadata("design:paramtypes", [follows_repository_1.FollowsRepository,
        charities_repository_1.CharitiesRepository])
], FavouriteController);
exports.FavouriteController = FavouriteController;
//# sourceMappingURL=follows.controller.js.map