import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Donations } from '../models/donations';

export class DonationsRepository extends DefaultCrudRepository<
    Donations,
    typeof Donations.prototype.id
> {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Donations, datasource);
    }
}