/*
* @Author: yglin
* @Date:   2016-04-26 12:01:44
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-29 15:06:17
*/

'use strict';

var config = require('../config/environment');
var Sequelize = require('sequelize');
var sqldb = require('./index');
var Q = require('q');

var dbs = {};

module.exports = {
    dbs: dbs,
    connectAll: connectAll,
    createDB: createDB,
    deleteDB: deleteDB,
    getModel: getModel,
    channelModelsOrdered: ['post', 'comment']
};

var channelModels = {
    post: '../api/post/post.model',
    comment: '../api/comment/comment.model'
};

function connectAll() {
    return sqldb.Channel.findAll()
    .then(function (channels) {
        var connectings = [];
        for (var i = 0; i < channels.length; i++) {
            if (!(channels[i].id in dbs)) {
                connectings.push(connectDB(channels[i]));
            }
        }
        return Q.allSettled(connectings);
    });
}

function createDB(channel) {
    var dbName = channel.id.replace(/-/g, '_');
    var queryScript = 'CREATE DATABASE IF NOT EXISTS ' + dbName + '';
    
    return sqldb.sequelize.query(queryScript)
    .then(function (result) {
        console.log('Database ' + dbName + ' is created~!!!');
        return Q.resolve(channel);
    })
    .then(function (channel) {
        return connectDB(channel, {force: true});
    })
    .catch(function (error) {
        console.error(queryScript + ' failed: ' + error);
        return Q.reject(error);               
    });
}

function connectDB(channel, options) {
    options = typeof options === 'object' ? options : {};
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

    if (options.force) {
        return sqldb.forceSync(channelDB.sequelize);
    }
    else {
        return channelDB.sequelize.sync();
    }
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

function getModel(channel_id, modelName) {
    var channelDB = dbs[channel_id];
    if (!channelDB) {
        console.error('Database of channel ' + channel_id + ' not connected');
        return null;
    }
    return channelDB.models[modelName];
}
