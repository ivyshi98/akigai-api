import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Donations } from '../models/donations';
export declare class DonationsRepository extends DefaultCrudRepository<Donations, typeof Donations.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
