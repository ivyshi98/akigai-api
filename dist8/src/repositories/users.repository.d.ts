import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Users } from '../models/users';
export declare class UsersRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
