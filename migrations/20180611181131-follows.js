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
  db.createTable('follows', {
    id: {
      type: 'int',
      primaryKey: 'true',
      autoIncrement: 'true'
    },

    charityId: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'charityIdFollowsFk',
        table: 'charities',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
  
    userId: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'userIdFollowsFk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  }, done );
};

exports.down = function(db, done) {
  db.dropTable('follows', done)
};

exports._meta = {
  "version": 1
};
