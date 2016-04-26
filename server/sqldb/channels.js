/*
* @Author: yglin
* @Date:   2016-04-26 12:01:44
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-26 20:42:58
*/

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';
import sqldb from './index';

var mysql = require('mysql');
var Q = require('q');

var dbs = {};

module.exports = {
    dbs: dbs,
    create: create,
};

var channelModels = {
    post: '../api/post/post.model'
};

function connect() {
    var connected = Q.defer();

    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    });

    connection.connect(function (error) {
        if (error) {
            console.error('Connection error: ' + error.stack);
            connected.reject(error);
        }
        else {
            console.log('Connected to MySql');
            connected.resolve(connection);
        }
    });

    return connected.promise;
}

function create(channel) {
    return connect().then(function (connection) {
        var created = Q.defer();
        var dbName = channel.id.replace(/-/g, '_');
        var queryScript = 'CREATE DATABASE IF NOT EXISTS ' + dbName + '';
        connection.query(queryScript, function (error) {
            if (error) {
                console.error(queryScript + ' failed: ' + error.stack);
                created.reject(error);                
            }
            else {
                console.log('Database ' + dbName + ' is created~!!!');
                var channelDB = {};
                channelDB.id = channel.id;
                channelDB.database = dbName;
                channelDB.sequelize = new Sequelize(channelDB.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);
                channelDB.models = {};

                for (var model in channelModels) {
                    channelDB.models[model] = channelDB.sequelize.import(channelModels[model]);
                }

                dbs[channel.id] = channelDB;

                sqldb.forceSync(channelDB.sequelize)
                .then(() => {
                    created.resolve(channelDB);                    
                })
                .catch((error) => {
                    created.reject(error);
                })
            }
        });
        return created.promise;
    });
}
