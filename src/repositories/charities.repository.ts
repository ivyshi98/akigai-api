import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Charities } from '../models/charities';

export class CharitiesRepository extends DefaultCrudRepository<
    Charities,
    typeof Charities.prototype.id
> {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Charities, datasource);
    }
}