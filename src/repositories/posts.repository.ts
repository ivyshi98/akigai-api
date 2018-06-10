import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Posts } from '../models/posts';

export class PostsRepository extends DefaultCrudRepository<
    Posts,
    typeof Posts.prototype.id
> {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Posts, datasource);
    }
}