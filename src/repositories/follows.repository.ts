import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Follows } from '../models/follows';

export class FollowsRepository extends DefaultCrudRepository<
    Follows,
    typeof Follows.prototype.id
> {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Follows, datasource);
    }
}