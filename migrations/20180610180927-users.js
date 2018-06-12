'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, done) {
  db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: 'true',
      autoIncrement: 'true'
    },

    firstname: {
      type: 'string',
      length: 50,
      notNull: true
    },

    lastname: {
      type: 'string',
      length: 50,
      notNull: true
    },

    username: {
      type: 'string',
      length: 100,
      notNull: true
    },

    email: {
      type: 'string',
      length: 100,
      notNull: true
    },

    password: {
      type: 'string',
      length: 2048,
      notNull: true
    },

  }, done);
};

exports.down = function(db, done) {
  db.dropTable('users', done)
};

exports._meta = {
  "version": 1
};
