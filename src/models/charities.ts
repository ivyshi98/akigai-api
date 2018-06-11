import { Entity, property, model } from '@loopback/repository';

@model()
export class Charities extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    name: string;

    @property({
        type: 'string',
        required: true
    })
    mission: string;

    @property({
        type: 'string',
        required: true
    })
    logo: string;

    @property({
        type: 'number',
        required: true
    })
    charityAddressId: number;

    @property({
        type: 'number',
        required: true
    })
    bankId: number;

    getId() {
        return this.id;
    }

}