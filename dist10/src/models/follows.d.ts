import { Entity } from '@loopback/repository';
export declare class Follows extends Entity {
    id?: number;
    userId: number;
    charityId: number;
}
