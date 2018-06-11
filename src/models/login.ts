import { Entity, property, model } from '@loopback/repository';

@model()
export class Login extends Entity {

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        id: true
    })
    username: number;

    @property({
        type: 'number',
        id: true
    })
    email: number;

}