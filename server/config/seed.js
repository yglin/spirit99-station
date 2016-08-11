/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Q = require('q');
var sqldb = require('../sqldb');
var ChannelDBs = require('../sqldb/channels');
var seedData = require('./seed-data');

var Thing;
var User;
var Channel;

module.exports = function (options) {
    return sqldb.init()
    .then(sqldb.forceSync)
    .then(populateThings)
    .then(populateUsers)
    .then(populateChannels)
    .then(seedChannelDatabases);
}

function populateThings() {
    Thing = sqldb.Thing;
    return Thing.sync()
    .then(() => {
        return Thing.bulkCreate(seedData.mainDB.things)
        .then(() => {
            console.log('Done populating things');
            return Q.resolve();
        });
    });
}

function populateUsers() {
    User = sqldb.User;
    return User.sync()
    .then(() => {
        return User.bulkCreate(seedData.mainDB.users)
        .then(() => {
            console.log('Done populating users');
            return Q.resolve();
        });
    });
}

function populateChannels() {
    Channel = sqldb.Channel;
    return Channel.sync()
    .then(() => {
        return Channel.bulkCreate(seedData.mainDB.channels)
        .then(() => {
            console.log('Done populating channels');
            return Q.resolve();
        });
    });
}

function seedChannelDatabases() {
    return Channel.findAll()
    .then((channels) => {
        if (channels.length > 0) {
            var lastDBSeeded = Q.defer();
            lastDBSeeded.resolve();
            lastDBSeeded = lastDBSeeded.promise;
            
            for (var i = 0; i < channels.length; i++) {
                lastDBSeeded = lastDBSeeded
                .then(seedChannelDB.bind(undefined, channels[i]));
            }

            return lastDBSeeded
            .then(() => {
                console.log('Done seeding all channel databases');
                return Q.resolve();
            });
        }
        else {
            console.log('No channels found, no need to seed channel databases');
            return Q.resolve();
        }
    });
}

function seedChannelDB(channel) {
    return ChannelDBs.deleteDB(channel)
    .then(function () {
        return ChannelDBs.createDB(channel);
    })
    .then(function (channelDB) {
        return populateChannelDB(channelDB);
    });
}

function populateChannelDB(channelDB) {
    if (!channelDB) {
        return Q.reject('channelDB is null or undefined');
    }
    if (!seedData.channelDBs[channelDB.id]) {
        console.log('No seed data for ' + channelDB.id + ', skip populating');
        return Q.resolve();
    }

    console.log('Start populating channel database ' + channelDB.database);
    
    var startup = Q.defer();
    var promise = startup.promise;
    for (var i = 0; i < ChannelDBs.channelModelsOrdered.length; i++) {
        var modelName = ChannelDBs.channelModelsOrdered[i];
        if (!(modelName in seedData.channelDBs[channelDB.id])) {
            continue;
        }
        promise = promise.then(populateModel.bind(undefined, channelDB.id, modelName));
    }
    startup.resolve();

    return promise
    .then(() => {
        console.log('Done populating channel database ' + channelDB.database);
        return Q.resolve();
    }, (error) => {
        console.error(error);
        return Q.reject();
    });
}

function populateModel(channel_id, modelName) {
    var Model = ChannelDBs.getModel(channel_id, modelName);
    var bulkData = seedData.channelDBs[channel_id][modelName];
    var done = Q.defer();
    Model.sync()
    .then(function() {
        return Model.bulkCreate(bulkData)
        .then(function() {
            console.log('Done populating ' + modelName);
            return done.resolve();
        });
    })
    .catch(function (error) {
        console.error(error);
        done.reject();
    });
    return done.promise;
}
