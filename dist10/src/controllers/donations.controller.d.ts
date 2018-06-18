import { CharitiesRepository } from "../repositories/charities.repository";
import { DonationsRepository } from '../repositories/donations.repository';
export declare class DonationsController {
    private donationsRepo;
    private charitiesRepo;
    constructor(donationsRepo: DonationsRepository, charitiesRepo: CharitiesRepository);
    getDonationsByUserId(jwt: string): Promise<object[]>;
}
