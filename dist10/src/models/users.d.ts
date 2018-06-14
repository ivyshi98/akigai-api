import { Entity } from '@loopback/repository';
export declare class Users extends Entity {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    getId(): number | undefined;
}
