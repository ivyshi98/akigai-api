import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Posts } from '../models/posts';
export declare class PostsRepository extends DefaultCrudRepository<Posts, typeof Posts.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
