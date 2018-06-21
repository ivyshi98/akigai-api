import { Entity, property, model } from '@loopback/repository';

@model({
    name: "billingAddresses"
})
export class billingAddresses extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    streetNumber: string;

    @property({
        type: 'string',
        required: true
    })
    streetName: string;

    @property({
        type: 'string',
        required: true
    })
    city: string;

    @property({
        type: 'string',
        required: true
    })
    country: string;

    @property({
        type: 'string',
    })
    state: string;

    @property({
        type: 'number',
    })
    postCode: number;

    getId() {
        return this.id;
    }

}