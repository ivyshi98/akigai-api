import { repository } from "@loopback/repository";
import { post, get, param, requestBody, HttpErrors } from "@loopback/rest";
import { PaymentMethods } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";
import { verify } from "jsonwebtoken";

export class PaymentMethodsController {

    constructor(
        @repository(PaymentMethodsRepository.name) private paymentRepo: PaymentMethodsRepository
    ) { }

    @post('/payment')
    async createPayment(
        @requestBody() payment: PaymentMethods,
        @param.query.string('jwt') jwt: string
    ): Promise<any> {

        if (!payment.cardholder) {
            throw new HttpErrors.BadRequest('Missing required data');
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

        var stripe = require("stripe")(
            "sk_test_HwVPqLsGWOz7sKX7CApdIe6d"
        );

        // stripe.charges.create({
        //     amount: Math.trunc((payment.amount * 100)),
        //     currency: payment.curency,
        //     source: token,
        //     description: "Charge for " + payment.cardholder
        // }, );

        try {
            var jwtBody = verify(jwt, 'encryption') as any;

            var storedPayment = new PaymentMethods;
            storedPayment.cardholder = payment.cardholder;
            storedPayment.paymenttoken = payment.paymenttoken;
            storedPayment.amount = payment.amount;
            storedPayment.curency = payment.curency;
            storedPayment.userId = jwtBody.user.id;
            storedPayment.date = payment.date;
            storedPayment.time = payment.time;

            stripe.charges.create({
                amount: Math.trunc((payment.amount * 100)),
                currency: payment.curency,
                source: token,
                description: "Charge for user " + storedPayment.userId
            }, );

            return await this.paymentRepo.create(storedPayment);
        }

        catch (err) {
            throw new HttpErrors.BadRequest('User invalid');
        }
    }

    @get('/payment-methods')
    async getAllPaymentMethods(): Promise<Array<PaymentMethods>> {
        return await this.paymentRepo.find();
    }

    @get('/payment-methods/{id}')
    async getPaymentMethodsByID(@param.path.number('id') id: number): Promise<PaymentMethods> {

        let paymentMethodExists: boolean = !!(await this.paymentRepo.count({ id }));

        if (!paymentMethodExists) {
            throw new HttpErrors.BadRequest(`Payment method does not exist`);
        }

        return await this.paymentRepo.findById(id);
    }
}