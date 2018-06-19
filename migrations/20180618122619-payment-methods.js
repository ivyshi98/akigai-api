'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, done) {
  db.createTable('payment-methods', {
    id: {
      type: 'int',
      primaryKey: 'true',
      autoIncrement: 'true'
    },

    cardholder: {
      type: 'string',
      notNull: true,
    },
  
    paymenttoken: {
      type: 'string',
      length: 2048
    },

    amount: {
      type: 'decimal',
      notNull: 'true',
      length: '10, 2'
    },

    curency: {
      type: 'string',
      legnth: 3,
    },

    userId: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'userIdPaymentMethodsFk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },

    date: {
      type: 'string',
      legnth: 200,
    },

    time: {
      type: 'string',
      legnth: 200,
    },

  }, done );
};

exports.down = function(db, done) {
  db.dropTable('payment-methods', done)
};

exports._meta = {
  "version": 1
};
