import { PaymentMethods } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";
export declare class PaymentMethodsController {
    private paymentRepo;
    constructor(paymentRepo: PaymentMethodsRepository);
    createPayment(payment: PaymentMethods, jwt: string): Promise<any>;
    getAllPaymentMethods(): Promise<Array<PaymentMethods>>;
    getPaymentMethodsByID(id: number): Promise<PaymentMethods>;
}
