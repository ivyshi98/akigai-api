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
const repository_1 = require("@loopback/repository");
const users_repository_1 = require("../repositories/users.repository");
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let UserInfoController = class UserInfoController {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    async getUser(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            return jwtBody;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    async updateUser(jwt, obj) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            await this.usersRepo.updateById(jwtBody.user.id, obj);
            var changedUser = await this.usersRepo.findById(jwtBody.user.id);
            if (changedUser.password.length < 15) {
                let hashedPassword = await bcrypt.hash(changedUser.password, 10);
                obj.password = hashedPassword;
                await this.usersRepo.updateById(changedUser.id, obj);
            }
            var jwt = jsonwebtoken_1.sign({
                user: {
                    id: changedUser.id,
                    firstname: changedUser.firstname,
                    lastname: changedUser.lastname,
                    username: changedUser.username,
                    email: changedUser.email
                },
            }, 'encryption', {
                issuer: 'auth.akigai',
                audience: 'akigai',
            });
            console.log(jwt);
            return {
                token: jwt,
            };
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
};
__decorate([
    rest_1.get('/User'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "getUser", null);
__decorate([
    rest_1.patch('/updateUser'),
    __param(0, rest_1.param.query.string('jwt')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "updateUser", null);
UserInfoController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UsersRepository.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UserInfoController);
exports.UserInfoController = UserInfoController;
//# sourceMappingURL=user-info.controller.js.map