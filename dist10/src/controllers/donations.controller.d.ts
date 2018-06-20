import { CharitiesRepository } from "../repositories/charities.repository";
import { DonationsRepository } from '../repositories/donations.repository';
import { Donations } from '../models/donations';
export declare class DonationsController {
    private donationsRepo;
    private charitiesRepo;
    constructor(donationsRepo: DonationsRepository, charitiesRepo: CharitiesRepository);
    getDonationsByUserId(jwt: string): Promise<object[]>;
    createDonation(newDonation: Donations, jwt: string, charityId: number): Promise<any>;
}
