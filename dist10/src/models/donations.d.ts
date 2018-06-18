import { Entity } from '@loopback/repository';
export declare class Donations extends Entity {
    id?: number;
    userId: number;
    charityId: number;
    amount: number;
    date: string;
    getId(): number | undefined;
}
