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
const charities_repository_1 = require("../repositories/charities.repository");
const charities_1 = require("../models/charities");
const jsonwebtoken_1 = require("jsonwebtoken");
let CharitiesController = class CharitiesController {
    constructor(charitiesRepo) {
        this.charitiesRepo = charitiesRepo;
    }
    // @get('/searchCharities')
    // async searchCharities(@param.query.string('queryText') queryText: string): Promise<Charities[]> {
    //  // if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');
    //   try {
    //     //var jwtBody = verify(jwt, 'encryption');
    //     var allCharities = await this.charitiesRepo.find();
    //     for (var i = 0, i < ){
    //     }
    //   } catch (err) {
    //     throw new HttpErrors.BadRequest('JWT token invalid');
    //   }
    //   }
    //get all charities
    //for charity list page
    async findCharities(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        var allCharities = await this.charitiesRepo.find();
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            return await this.charitiesRepo.find();
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    //create new charities
    async postCharities(charity) {
        return await this.charitiesRepo.create(charity);
    }
    //get one charity by charity id
    //for charity detail page
    async findCharityById(id) {
        let idExists = !!(await this.charitiesRepo.count({ id }));
        if (!idExists) {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${id} does not exist`);
        }
        return await this.charitiesRepo.findById(id);
    }
};
__decorate([
    rest_1.get('/allCharities'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "findCharities", null);
__decorate([
    rest_1.post('/charities'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charities_1.Charities]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "postCharities", null);
__decorate([
    rest_1.get('/charity/{id}') //:id
    ,
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "findCharityById", null);
CharitiesController = __decorate([
    __param(0, repository_1.repository(charities_repository_1.CharitiesRepository.name)),
    __metadata("design:paramtypes", [charities_repository_1.CharitiesRepository])
], CharitiesController);
exports.CharitiesController = CharitiesController;
//# sourceMappingURL=charities.controller.js.map