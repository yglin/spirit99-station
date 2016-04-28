/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');
var Sequelize = require('sequelize');
var Q = require('q');

var db = module.exports = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options),
  forceSync: forceSync
};

// Insert models below
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Channel = db.sequelize.import('../api/channel/channel.model');

function forceSync(sequelize) {
// Force sync database strcture
    return sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    .then(function(){
        return sequelize.sync({ force: true });
    })
    .then(function(){
        return sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    })
    .then(function(){
        console.log('Database synchronised.');
        return Q.resolve();
    }, function(error){
        console.log(error);
        return Q.reject(error);
    });
}