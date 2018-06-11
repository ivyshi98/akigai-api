import { Entity } from '@loopback/repository';
export declare class billingAddresses extends Entity {
    id?: number;
    streetNumber: string;
    streetName: string;
    city: string;
    country: string;
    state: string;
    postCode: number;
    getId(): number | undefined;
}
