import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Users } from '../models/users';

export class UsersRepository extends DefaultCrudRepository<
    Users,
    typeof Users.prototype.id
> {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Users, datasource);
    }
}