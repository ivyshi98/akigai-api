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
const login_1 = require("../models/login");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let LoginController = class LoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async login(login) {
        if (!login.username || !login.password) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        let userExists = !!(await this.userRepo.count({
            and: [
                { username: login.username },
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('user does not exist');
        }
        var users = await this.userRepo.find();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.username == login.username && await bcrypt.compare(login.password, user.password)) {
                //return user;
                var jwt = jsonwebtoken_1.sign({
                    user: {
                        id: user.id,
                        firstname: user.firstname,
                        email: user.email
                    },
                }, 'encryption', {
                    issuer: 'auth.akigai',
                    audience: 'akigai',
                });
                return {
                    token: jwt,
                };
            }
        }
    }
};
__decorate([
    rest_1.post('/login'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.Login]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UsersRepository.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map