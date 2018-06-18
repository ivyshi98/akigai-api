import { get, post, requestBody, HttpErrors, param } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { CharitiesRepository } from "../repositories/charities.repository";
import { Charities } from "../models/charities";
import { DonationsRepository } from '../repositories/donations.repository';
import { sign, verify } from 'jsonwebtoken';
import { Donations } from '../models/donations';

export class DonationsController {
  constructor(
    @repository(DonationsRepository.name) private donationsRepo: DonationsRepository,
    @repository(CharitiesRepository.name) private charitiesRepo: CharitiesRepository
  ) {}

  @get('/donations')
  async getDonationsByUserId(@param.query.string('jwt') jwt: string) {

      if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

      try {
        var jwtBody = verify(jwt, 'encryption') as any;
        console.log(jwtBody);

        //Find all the donations associated with the user id
        var userDonations = await this.donationsRepo.find({where: {userId: jwtBody.user.id}});

        //Convert the charityId for each donation into a charity name and logo
        var allCharities = await this.charitiesRepo.find();
        var charityIdToName: { [key: number]: string } = {};
        var charityIdToLogo: { [key: number]: string } = {};

        for (var i = 0; i < allCharities.length; ++i) {
          let charity = allCharities[i];
          charityIdToName[charity.id as number] = charity.name;
          charityIdToLogo[charity.id as number] = charity.logo;
        }

        //Create object with userDonation properties and charity name and logo properties
        var userDonationProperties: Array<object> = [];

        for (var i = 0; i < userDonations.length; ++i) {
          let { amount, date, charityId} = userDonations[i];
          userDonationProperties.push({
            amount,
            date,
            charityName: charityIdToName[charityId as number],
            charityLogo: charityIdToLogo[charityId as number],
          });
        }

        return userDonationProperties;

      } 
      
      catch (err) {
        throw new HttpErrors.BadRequest('JWT token invalid');
      }

  }

  //create a donation with userId and charityId
  @post('/createDonation') 
  async createDonation(
    @requestBody() newDonation: Donations,
    @param.query.string('jwt') jwt: string,
    @param.query.number('charityId') charityId: number,
    ): Promise<any>{

    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

    try {
      var jwtBody = verify(jwt, 'encryption') as any;
      console.log(jwtBody);
      
      newDonation.userId = jwtBody.user.id;
      newDonation.charityId = charityId;

      var donation = this.donationsRepo.create(newDonation);
      return donation;

    }

    catch (err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }

  }

  // @get('/charitiesByUserId') 
  // async getCharitiesByUserId(@param.query.number('jwt') jwt: string) {
  //   if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

  //   try {
  //     var jwtBody = verify(jwt, 'encryption') as any;

  //     //Get all donations associated with a user
  //     var userDonations = await this.donationsRepo.find({where: {userId: jwtBody.user.id}});

  //     //
  //   }

  //   catch (err) {
  //     throw new HttpErrors.BadRequest('JWT token invalid');
  //   }
  // }
}