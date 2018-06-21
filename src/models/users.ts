import { Entity, property, model } from '@loopback/repository';

@model({
    name: "users"
})
export class Users extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    firstname: string;

    @property({
        type: 'string',
        required: true
    })
    lastname: string;

    @property({
        type: 'string',
        required: true
    })
    username: string;

    @property({
        type: 'string',
        required: true
    })
    email: string;

    @property({
        type: 'string',
        required: true
    })
    password: string;

    getId() {
        return this.id;
    }
}