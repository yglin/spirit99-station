/*
* @Author: yglin
* @Date:   2016-04-26 12:01:44
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-11 20:14:31
*/

'use strict';

var config = require('../config/environment');
var Sequelize = require('sequelize');
var sqldb = require('./index');
var Q = require('q');
var inquirer = require('inquirer');

var dbs = {};

module.exports = {
    dbs: dbs,
    connectAll: connectAll,
    createDB: createDB,
    deleteDB: deleteDB,
    getModel: getModel,
    channelModelsOrdered: ['place', 'post', 'comment']
};

var channelModels = {
    place: '../api/place/place.model',
    post: '../api/post/post.model',
    comment: '../api/comment/comment.model'
};

function connectAll() {
    return sqldb.Channel.findAll()
    .then(function (channels) {
        console.log('Got these channels: ' + channels.map(function (channel, index) {
            return channel.id;
        }).toString());
        var connectings = [];
        for (var i = 0; i < channels.length; i++) {
            if (!(channels[i].id in dbs)) {
                connectings.push(connectDB(channels[i]));
            }
        }
        return Q.allSettled(connectings).then(function () {
            console.log('All channel databases are connected');
            return Q.resolve();
        }, function (error) {
            return Q.reject(error);
        });
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
    // Associations
    associate(channelDB.models);

    dbs[channel.id] = channelDB;

    console.log('Now connect to database ' + dbName + '...');
    return channelDB.sequelize.sync().then(function () {
        console.log('Connected to database: ' + dbName);
        return Q.resolve(channelDB);
    }, function (error) {
        console.error('Failed to connect to database: ' + dbName);
        console.error(error);
        return Q.reject(error);
    });
}

function deleteDB(channel) {
    var dbName = channel.id.replace(/-/g, '_');
    var queryScript = 'DROP DATABASE IF EXISTS ' + dbName + '';

    var permission = Q.defer();
    if (process.env.NODE_ENV === 'production') {
        inquirer.prompt([{
            type: 'confirm',
            name: 'killthemall',
            message: 'Drop database ' + dbName + '? Are you serious?',
            default: false
        }])
        .then(function (answer) {
            if (answer.killthemall) {
                permission.resolve();
            }
            else {
                permission.reject('Can\'drop database ' + dbName + ', never think about it');
            }
        })
    }
    else {
        permission.resolve();
    }
    
    return permission.promise
    .then(function () {
        return sqldb.sequelize.query(queryScript);
    })
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

function associate(models) {
    var Post = models.post;
    var Place = models.place;
    var Comment = models.comment;

    Post.belongsTo(Place, {
        foreignKey: 'place_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'Location'
    });
    Place.hasMany(Post, { foreignKey:'place_id', as:'Posts' });

    Comment.belongsTo(Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'Post'
    });
    Post.hasMany(Comment, { foreignKey:'post_id', as:'Comments' });
}
