/*
* @Author: yglin
* @Date:   2016-04-26 12:01:44
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 13:24:11
*/

'use strict';

var config = require('../config/environment');
var Sequelize = require('sequelize');
var sqldb = require('./index');
var Q = require('q');

var dbs = {};

module.exports = {
    dbs: dbs,
    createDB: createDB,
    deleteDB: deleteDB,
    channelModelsOrdered: ['post', 'comment']
};

var channelModels = {
    post: '../api/post/post.model',
    comment: '../api/comment/comment.model'
};

function createDB(channel) {
    var dbName = channel.id.replace(/-/g, '_');
    var queryScript = 'CREATE DATABASE IF NOT EXISTS ' + dbName + '';
    
    return sqldb.sequelize.query(queryScript)
    .then(function (result) {
        console.log('Database ' + dbName + ' is created~!!!');
        return Q.resolve(channel);
    })
    .then(connectDB)
    .catch(function (error) {
        console.error(queryScript + ' failed: ' + error);
        return Q.reject(error);               
    });
}

function connectDB(channel) {
    var dbName = channel.id.replace(/-/g, '_');
    var channelDB = {};
    channelDB.id = channel.id;
    channelDB.database = dbName;
    channelDB.sequelize = new Sequelize(channelDB.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);
    channelDB.models = {};

    for (var model in channelModels) {
        channelDB.models[model] = channelDB.sequelize.import(channelModels[model]);
    }

    dbs[channel.id] = channelDB;

    return sqldb.forceSync(channelDB.sequelize);
}

function deleteDB(channel) {
    var dbName = channel.id.replace(/-/g, '_');
    var queryScript = 'DROP DATABASE IF EXISTS ' + dbName + '';
    
    return sqldb.sequelize.query(queryScript)
    .then(function (result) {
        console.log('Database ' + dbName + ' is dropped~!!!');
        return Q.resolve(channel);
    })
    .catch(function (error) {
        console.error(queryScript + ' failed: ' + error);
        return Q.reject(error);               
    });
}
