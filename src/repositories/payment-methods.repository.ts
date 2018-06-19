import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { PaymentMethods } from '../models/payment-methods';

export class PaymentMethodsRepository extends DefaultCrudRepository<
    PaymentMethods,
    typeof PaymentMethods.prototype.id
    > {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(PaymentMethods, datasource);
    }
}