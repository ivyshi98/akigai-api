import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { PaymentMethods } from '../models/payment-methods';
export declare class PaymentMethodsRepository extends DefaultCrudRepository<PaymentMethods, typeof PaymentMethods.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
