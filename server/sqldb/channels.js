/*
* @Author: yglin
* @Date:   2016-04-26 12:01:44
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-27 12:09:57
*/

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';
import sqldb from './index';

var Q = require('q');

var dbs = {};

module.exports = {
    dbs: dbs,
    create: create,
    channelModelsOrdered: ['post', 'comment']
};

var channelModels = {
    post: '../api/post/post.model',
    comment: '../api/comment/comment.model'
};

// function connect() {
//     var connected = Q.defer();

//     var connection = mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD
//     });

//     connection.connect(function (error) {
//         if (error) {
//             console.error('Connection error: ' + error.stack);
//             connected.reject(error);
//         }
//         else {
//             console.log('Connected to MySql');
//             connected.resolve(connection);
//         }
//     });

//     return connected.promise;
// }

function create(channel) {
    var created = Q.defer();
    var dbName = channel.id.replace(/-/g, '_');
    var queryScript = 'CREATE DATABASE IF NOT EXISTS ' + dbName + '';
    sqldb.sequelize.query(queryScript)
    .then(function (result) {
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

        return sqldb.forceSync(channelDB.sequelize)
        .then(() => {
            created.resolve(channelDB);                    
        })
        .catch((error) => {
            created.reject(error);
        });
    })
    .catch(function (error) {
        console.error(queryScript + ' failed: ' + error);
        created.reject(error);                
    });

    return created.promise;
}
