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
const rest_1 = require("@loopback/rest");
const payment_methods_1 = require("../models/payment-methods");
const payment_methods_repository_1 = require("../repositories/payment-methods.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
let PaymentMethodsController = class PaymentMethodsController {
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }
    async createPayment(payment, jwt) {
        if (!payment.cardholder) {
            throw new rest_1.HttpErrors.BadRequest('Missing required data');
        }
        //   let paymentMethodExists: boolean = !!(await this.paymentRepo.count(
        //     { payment_token: payment.payment_token }
        //     ));
        //   if (paymentMethodExists) {
        //     throw new HttpErrors.BadRequest('Card already registered');
        //   }
        var stripe = require("stripe")("sk_test_HwVPqLsGWOz7sKX7CApdIe6d");
        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        const token = payment.paymenttoken; // Using Express
        var stripe = require("stripe")("sk_test_HwVPqLsGWOz7sKX7CApdIe6d");
        // stripe.charges.create({
        //     amount: Math.trunc((payment.amount * 100)),
        //     currency: payment.curency,
        //     source: token,
        //     description: "Charge for " + payment.cardholder
        // }, );
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'encryption');
            var storedPayment = new payment_methods_1.PaymentMethods;
            storedPayment.cardholder = payment.cardholder;
            storedPayment.paymenttoken = payment.paymenttoken;
            storedPayment.amount = payment.amount;
            storedPayment.currency = payment.curency;
            storedPayment.userId = jwtBody.user.id;
            storedPayment.date = payment.date;
            storedPayment.time = payment.time;
            stripe.charges.create({
                amount: Math.trunc((payment.amount * 100)),
                currency: payment.curency,
                source: token,
                description: "Charge for user " + storedPayment.userId
            });
            return await this.paymentRepo.create(storedPayment);
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('User invalid');
        }
    }
    async getAllPaymentMethods() {
        return await this.paymentRepo.find();
    }
    async getPaymentMethodsByID(id) {
        let paymentMethodExists = !!(await this.paymentRepo.count({ id }));
        if (!paymentMethodExists) {
            throw new rest_1.HttpErrors.BadRequest(`Payment method does not exist`);
        }
        return await this.paymentRepo.findById(id);
    }
};
__decorate([
    rest_1.post('/payment'),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_methods_1.PaymentMethods, String]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "createPayment", null);
__decorate([
    rest_1.get('/payment-methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "getAllPaymentMethods", null);
__decorate([
    rest_1.get('/payment-methods/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "getPaymentMethodsByID", null);
PaymentMethodsController = __decorate([
    __param(0, repository_1.repository(payment_methods_repository_1.PaymentMethodsRepository.name)),
    __metadata("design:paramtypes", [payment_methods_repository_1.PaymentMethodsRepository])
], PaymentMethodsController);
exports.PaymentMethodsController = PaymentMethodsController;
//# sourceMappingURL=payment-methods.controller.js.map