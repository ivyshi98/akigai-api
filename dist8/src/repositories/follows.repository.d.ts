import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Follows } from '../models/follows';
export declare class FollowsRepository extends DefaultCrudRepository<Follows, typeof Follows.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
