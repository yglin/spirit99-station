/**
 * Sequelize initialization module
 */

'use strict';

// var path = require('path');
// var mysql = require('mysql');
var Sequelize = require('sequelize');
// var Q = require('q');

var config = require('../config/environment');
var schema = require('./schema');

var db = module.exports = {
  Sequelize,
  connect,
  // init: init,
  // forceSync: forceSync
};

function connect() {
    var sqlConfig = config.sequelize;
    db.sequelize = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, sqlConfig.options);    
    return schema.sync(db.sequelize);
}

// function init() {
//     var done = Q.defer();

//     var connection = mysql.createConnection({
//         host: config.sequelize.options.host,
//         user: config.sequelize.username,
//         password: config.sequelize.password
//     });

//     connection.connect(function (error) {
//         if (error) {
//             console.warn('Connection error in sequelize initialization:\n' + error.stack);
//             done.resolve();
//             return;
//         }

//         var queryCmd = 'CREATE DATABASE IF NOT EXISTS ' + config.sequelize.database;
//         connection.query(queryCmd, function (error, results, fields){
//             if (error) {
//                 console.error('Fail to create main database in sequelize initialization:\nQuery Command = "' + queryCmd + '"\n' + error.stack);
//                 done.reject(error);
//                 return;
//             }

//             console.info('Main database "' + config.sequelize.database + '" is created');
//             done.resolve();
//         });

//         connection.end(function (error) {
//             if (error) {
//                 console.warn('Fail to close connection in sequelize initialization:\n' + error.stack);
//             }
//             done.resolve();
//         })
//     });

//     return done.promise.then(function () {
//         db.sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);

//         // Insert models below
//         db.Thing = db.sequelize.import('../api/thing/thing.model');
//         db.User = db.sequelize.import('../api/user/user.model');
//         db.Channel = db.sequelize.import('../api/channel/channel.model');

//         console.log('Database initialization complete...');

//         return Q.resolve();
//     });
// }

// function forceSync(sequelize) {
// // Force sync database strcture
//     if (!sequelize) {
//         sequelize = db.sequelize;
//     }
    
//     return sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
//     .then(function(){
//         return sequelize.sync({ force: true });
//     })
//     .then(function(){
//         return sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
//     })
//     .then(function(){
//         console.log('Database synchronised.');
//         return Q.resolve();
//     }, function(error){
//         console.log(error);
//         return Q.reject(error);
//     });
// }