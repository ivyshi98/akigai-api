import { Entity, property, model } from '@loopback/repository';

@model()
export class Posts extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        id: true
    })
    charityId: number;

    @property({
        type: 'string',
        required: true
    })
    text: string;

    @property({
        type: 'string',
        required: true
    })
    img: string;

    @property({
        type: 'string',
        required: true
    })
    date: string;
}