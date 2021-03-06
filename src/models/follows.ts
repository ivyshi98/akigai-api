import { Entity, property, model } from '@loopback/repository';

@model()
export class Follows extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        id: true
    })
    userId: number;

    @property({
        type: 'number',
        id: true
    })
    charityId: number;


}