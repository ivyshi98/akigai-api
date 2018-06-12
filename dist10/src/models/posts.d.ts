import { Entity } from '@loopback/repository';
export declare class Posts extends Entity {
    id?: number;
    charityId: number;
    text: string;
    img: string;
    date: string;
}
