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
  db.createTable('charities', {
    id: {
      type: 'int',
      primaryKey: 'true',
      autoIncrement: 'true'
    },

    name: {
      type: 'string',
      length: 200,
      notNull: true
    },

    mission: {
      type: 'string',
    },

    logo: {
      type: 'string',
    },

    charityAddressId: {
      type: 'int',
      notNull: true
    },

    bankId: {
      type: 'int',
      notNull: true
    },

  }, done);
};

exports.down = function(db, done) {
  db.dropTable('charities', done)
};

exports._meta = {
  "version": 1
};
