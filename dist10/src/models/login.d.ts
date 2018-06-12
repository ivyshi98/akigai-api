import { Entity } from '@loopback/repository';
export declare class Login extends Entity {
    id?: number;
    username: string;
    password: string;
}
