/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Q = require('q');
import sqldb from '../sqldb';
import ChannelDBs from '../sqldb/channels';
var seedData = require('./seed-data');
var Thing = sqldb.Thing;
var User = sqldb.User;
var Channel = sqldb.Channel;

var allDone = Q.defer();
module.exports = allDone.promise;

var thingsPopulated = Q.defer();
var usersPopulated = Q.defer();
var channelsPopulated = Q.defer();

Q.all([thingsPopulated, usersPopulated, channelsPopulated])
.then(() => {
    allDone.resolve();
}, (error) => {
    allDone.reject(error);
});

Thing.sync()
.then(() => {
    return Thing.bulkCreate(seedData.mainDB.things)
    .then(() => {
        console.log('finished populating things');
        thingsPopulated.resolve();
    });
})
.catch((error) => {
    thingsPopulated.reject(error);
});

var testUserCreated = Q.defer();

User.sync()
.then(() => {
    return User.bulkCreate(seedData.mainDB.users)
    .then(() => {
        console.log('finished populating users');
        usersPopulated.resolve();
        return User.findOne({where: {email: 'test@example.com'}}).then(function (user) {
            if (user) {
                testUserCreated.resolve(user);
            }
            else {
                testUserCreated.reject('Can not find user test@example.com');
            }
        });
    });
})
.catch((error) => {
    usersPopulated.reject(error);
});

Channel.sync()
.then(() => {
    return testUserCreated.promise;
})
.then((user) => {
    for (var i = seedData.mainDB.channels.length - 1; i >= 0; i--) {
        seedData.mainDB.channels[i].owner_id = user._id;
    }
    return Channel.bulkCreate(seedData.mainDB.channels)
    .then(() => {
        return Channel.findAll().then((channels) => {
            if (channels.length > 0) {
                console.log('finished populating channels');
                channelsPopulated.resolve(channels);
                return Q.resolve();
            }
            else {
                return Q.reject('Find no channel');
            }
        });
    });
})
.catch((error) => {
    channelsPopulated.reject(error);
});    

channelsPopulated.promise.then((channels) => {
    var channelDBsSeeded = [];
    
    for (var i = channels.length - 1; i >= 0; i--) {
        var channelDBSeeded = ChannelDBs.create(channels[i])
        .then((channelDB) => {
            return channelDB.sequelize.sync().then(() => {
                return seedChannelDB(channelDB);                
            });
        });
        channelDBsSeeded.push(channelDBSeeded);
    }

    Q.allSettled(channelDBsSeeded)
    .then(() => {
        console.log('finished seeding all channel databases');
        allDone.resolve();
    });
});

function seedChannelDB(channelDB) {
    var populatedModels = [];

    if (!seedData.channelDBs[channelDB.id]) {
        return Q.reject();
    }

    for (var modelName in channelDB.models) {
        var Model = channelDB.models[modelName];
        var populated = Q.defer();

        var bulkData = seedData.channelDBs[channelDB.id][modelName];
        if (!bulkData) {
            continue;
        }
        Model.sync()
        .then(() => {
            return Model.bulkCreate(bulkData)
            .then(() => {
                console.log('Populated ' + channelDB.database + '.' + modelName);
                populated.resolve();
            });
        })
        .catch((error) => {
            console.error(error);
            populated.reject(error);
        });

        populatedModels.push(populated.promise);
    }

    return Q.all(populatedModels).then(() => {
        console.log('finished seeding channel database ' + channelDB.database);
        return Q.resolve();
    }, (error) => {
        console.error(error);
        return Q.reject();
    });
}
