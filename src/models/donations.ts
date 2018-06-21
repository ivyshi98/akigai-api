import { Entity, property, model } from '@loopback/repository';

@model({
    name: "donations"
})
export class Donations extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        required: true
    })
    userId: number;

    @property({
        type: 'number',
        required: true
    })
    charityId: number;

    @property({
        type: 'number',
        required: true
    })
    amount: number;

    @property({
        type: 'string',
        required: true
    })
    date: string;

    getId() {
        return this.id;
    }

}