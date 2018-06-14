import { Entity } from '@loopback/repository';
export declare class Charities extends Entity {
    id?: number;
    name: string;
    mission: string;
    logo: string;
    charityAddressId: number;
    bankId: number;
    getId(): number | undefined;
}
