/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Q = require('q');
import sqldb from '../sqldb';
var seedData = require('./seed-data');
var Thing = sqldb.Thing;
var User = sqldb.User;
var Channel = sqldb.Channel;

Thing.sync()
    .then(() => {
        return Thing.destroy({ where: {} });
    })
    .then(() => {
        Thing.bulkCreate(seedData.things);
    });

var testUserCreated = Q.defer();

User.sync()
.then(() => User.destroy({ where: {} }))
.then(() => {
    User.bulkCreate(seedData.users)
    .then(() => {
        console.log('finished populating users');
        User.findOne({where: {email: 'test@example.com'}}).then(function (user) {
            if (user) {
                testUserCreated.resolve(user);
            }
            else {
                testUserCreated.reject('Can not find user test@example.com');
            }
        });
    });
});

Channel.sync()
.then(() => Channel.destroy({ where: {} }))
.then(() => {
    testUserCreated.promise.then(function (user) {
        for (var i = seedData.channels.length - 1; i >= 0; i--) {
            seedData.channels[i].owner_id = user._id;
        }
        Channel.bulkCreate(seedData.channels)
        .then(() => {
            console.log('finished populating channels');
        });
    });
});
