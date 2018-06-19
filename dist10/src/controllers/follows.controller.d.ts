import { FollowsRepository } from "../repositories/follows.repository";
import { CharitiesRepository } from "../repositories/charities.repository";
import { Charities } from "../models/charities";
export declare class FavouriteController {
    private followsRepo;
    private charitiesRepo;
    constructor(followsRepo: FollowsRepository, charitiesRepo: CharitiesRepository);
    addUserFavourites(charityId: number, jwt: string): Promise<any>;
    findUserFavourites(jwt: string): Promise<Array<Charities>>;
    checkFavourites(charityId: number, jwt: string): Promise<boolean>;
    deleteUserFavourites(charityId: number, jwt: string): Promise<boolean>;
}
