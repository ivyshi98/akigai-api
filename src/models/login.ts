import { Entity, property, model } from '@loopback/repository';

@model({
    name: "login"
})
export class Login extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        id: true
    })
    username: string;

    @property({
        type: 'string',
        id: true
    })
    password: string;

}