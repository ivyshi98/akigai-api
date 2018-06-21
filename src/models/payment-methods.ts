import { Entity, property, model } from '@loopback/repository';

@model({
    name: "paymentmethods"
})
export class PaymentMethods extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    cardholder: string;

    @property({
        type: 'string',
        required: true
    })
    paymenttoken: string;

    @property({
        type: 'number',
        required: true
    })
    amount: number;

    @property({
        type: 'string'
    })
    currency: string;

    @property({
        type: 'number',
        id: true
    })
    userId: number;

    @property({
        type: 'string'
    })
    date: Date;

    @property({
        type: 'string'
    })
    time: Date;

    getId() {
        return this.id;
    }
}