var path = require('path');
var exec = require('child_process').exec;
var moment = require('moment');
var Q = require('q');
var mysql = require('mysql');
var Sequelize = require('sequelize');
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var config = require('../server/config/environment');
var schema = require('../server/sqldb/schema');

var connection = null;

exports.up = function(db, callback) {
    var done = Q.defer();
    var sqlConfig = config.sequelize;

    connectDB(sqlConfig)
    .then(function () {
        return createDB(sqlConfig, connection);
    })
    .then(function () {
        var sequelize = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, sqlConfig.options);    
        return schema.sync(sequelize);
    })
    .then(function () {
        return done.resolve();
    })
    .catch(function (error) {
        console.error(error);
        done.reject(error);
    })
    .finally(function () {
        closeConnection(connection);
    });

    return done.promise.then(callback);
};

exports.down = function(db, callback) {
    var done = Q.defer();
    var sqlConfig = config.sequelize;
    connectDB(sqlConfig)
    .then(function () {
        return backupDB(sqlConfig, connection);
    })
    .then(function () {
        return dropAllTables(sqlConfig, connection);
    })
    .then(function () {
        done.resolve();
    })
    .catch(function (error) {
        console.error(error);
        done.reject(error);
    })
    .finally(function () {
        closeConnection(connection);
    });

    return done.promise.then(callback);
};

function connectDB(sqlConfig) {
    var done = Q.defer();

    if (connection) {
        done.resolve(connection);
    }
    else {
        connection = mysql.createConnection({
            host: sqlConfig.options.host,
            user: sqlConfig.username,
            password: sqlConfig.password
        });

        connection.connect(function (error) {
            if (error) {
                console.error('Failed to connect to mysql server');
                console.error(error.stack);
                done.reject(error);
            }
            else {
                done.resolve(connection);
            }
        });        
    }

    return done.promise;
}

function closeConnection(connection) {
    var done = Q.defer();

    if (!connection) {
        done.resolve();
    }
    else {
        connection.end(function (error) {
            if (error) {
                console.warn('Failed to close connection');
                console.warn(error.stack);
                done.reject(error);
            }
            else {
                connection = null;
                done.resolve();
            }
        });
    }

    return done.promise;
}

function createDB(sqlConfig, connection) {
    var done = Q.defer();
    var queryCmd = 'CREATE DATABASE IF NOT EXISTS ' + sqlConfig.database;
    connection.query(queryCmd, function (error, results, fields){
        if (error) {
            console.error('Fail to create database ' + sqlConfig.database);
            console.error(error.stack);
            done.reject(error);
        }
        else {
            console.info('Database ' + sqlConfig.database + ' is created');
            done.resolve();            
        }
    });
    return done.promise;
}


function dropDB(sqlConfig, connection) {
    var done = Q.defer();
    var queryCmd = 'DROP DATABASE IF EXISTS ' + sqlConfig.database;
    connection.query(queryCmd, function (error, results, fields){
        if (error) {
            console.error('Fail to drop database ' + sqlConfig.database);
            console.error(error.stack);
            done.reject(error);
        }
        else {
            console.info('Database ' + sqlConfig.database + ' is dropped');
            done.resolve();            
        }
    });

    return done.promise;    
}

function backupDB(sqlConfig, connection) {
    var done = Q.defer();
    var backupFile = moment().format('YYYYMMDDHHmmss') + '.' + sqlConfig.database + '.sql';
    var command = 'mysqldump -u ' + sqlConfig.username + ' -p' + sqlConfig.password + ' ' + sqlConfig.database + ' > ' + backupFile;
    var proc = exec(command,
    {
        cwd: path.resolve(path.join(__dirname, '../db-backup'))
    },
    function (error, stdout, stderr) {
        if (error) {
            console.error(error);
            done.reject(error);
        }
        else {
            done.resolve();
        }
    });
    // proc.stdout.pipe(process.stdout);
    // proc.stderr.pipe(process.stderr);
    return done.promise;
}

function dropAllTables(sqlConfig, connection) {
    var done = Q.defer();
    var tables = ['comment', 'PlaceStory', 'place', 'story', 'channel', 'user']
    .map(function (value, index) {
        return sqlConfig.database + '.' + value;
    });
    var queryCmd = 'DROP TABLE ' + tables.join(',');
    console.info('Query SQL: ' + queryCmd);
    connection.query(queryCmd, function (error, results, fields){
        if (error) {
            console.error('Fail to drop tables ' + tables.join(','));
            console.error(error.stack);
            done.reject(error);
        }
        else {
            console.info('Tables dropped: ' + tables.join(','));
            done.resolve();            
        }
    });

    return done.promise;
}
