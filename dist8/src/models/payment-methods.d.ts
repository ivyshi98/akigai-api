import { Entity } from '@loopback/repository';
export declare class PaymentMethods extends Entity {
    id?: number;
    cardholder: string;
    paymenttoken: string;
    amount: number;
    curency: string;
    userId: number;
    date: Date;
    time: Date;
    getId(): number | undefined;
}
