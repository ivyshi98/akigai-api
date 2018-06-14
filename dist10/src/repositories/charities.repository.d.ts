import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Charities } from '../models/charities';
export declare class CharitiesRepository extends DefaultCrudRepository<Charities, typeof Charities.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
