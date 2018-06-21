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
const donations_repository_1 = require("../repositories/donations.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const donations_1 = require("../models/donations");
let DonationsController = class DonationsController {
    constructor(donationsRepo, charitiesRepo) {
        this.donationsRepo = donationsRepo;
        this.charitiesRepo = charitiesRepo;
    }
    async getDonationsByUserId(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            console.log(jwtBody);
            //Find all the donations associated with the user id
            var userDonations = await this.donationsRepo.find({ where: { userId: jwtBody.user.id } });
            //Convert the charityId for each donation into a charity name and logo
            var allCharities = await this.charitiesRepo.find();
            var charityIdToName = {};
            var charityIdToLogo = {};
            for (var i = 0; i < allCharities.length; ++i) {
                let charity = allCharities[i];
                charityIdToName[charity.id] = charity.name;
                charityIdToLogo[charity.id] = charity.logo;
            }
            //Create object with userDonation properties and charity name and logo properties
            var userDonationProperties = [];
            for (var i = 0; i < userDonations.length; ++i) {
                let { amount, date, charityId } = userDonations[i];
                userDonationProperties.push({
                    amount,
                    date,
                    charityName: charityIdToName[charityId],
                    charityLogo: charityIdToLogo[charityId],
                });
            }
            return userDonationProperties;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    //create a donation with userId and charityId
    async createDonation(newDonation, jwt, charityId) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            console.log(jwtBody);
            newDonation.userId = jwtBody.user.id;
            newDonation.charityId = charityId;
            var donation = this.donationsRepo.create(newDonation);
            return donation;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
};
__decorate([
    rest_1.get('/donations'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getDonationsByUserId", null);
__decorate([
    rest_1.post('/createDonation'),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.string('jwt')),
    __param(2, rest_1.param.query.number('charityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donations_1.Donations, String, Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "createDonation", null);
DonationsController = __decorate([
    __param(0, repository_1.repository(donations_repository_1.DonationsRepository.name)),
    __param(1, repository_1.repository(charities_repository_1.CharitiesRepository.name)),
    __metadata("design:paramtypes", [donations_repository_1.DonationsRepository,
        charities_repository_1.CharitiesRepository])
], DonationsController);
exports.DonationsController = DonationsController;
//# sourceMappingURL=donations.controller.js.map